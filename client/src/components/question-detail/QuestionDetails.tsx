import { dtf } from "@/lib/intl";
import { ChevronDown, ChevronUp, Slash } from "lucide-react";
import { graphql, useFragment, useMutation } from "react-relay";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { QuestionDetailsFragment$key } from "./__generated__/QuestionDetailsFragment.graphql";

const QuestionDetailsFragment = graphql`
  fragment QuestionDetailsFragment on Question {
    id
    title
    description
    votesCount
    currentUserVote
    createdAt
  }
`;

const QuestionDetailsVoteMutation = graphql`
  mutation QuestionDetailsVoteMutation($voteType: VoteType!, $questionId: ID!) {
    voteQuestion(voteType: $voteType, questionId: $questionId) {
      __typename
      ... on Question {
        ...QuestionDetailsFragment
      }
    }
  }
`;

const QuestionDetailsDeleteVoteMutation = graphql`
  mutation QuestionDetailsDeleteVoteMutation($questionId: ID!) {
    deleteQuestionVote(questionId: $questionId) {
      __typename
      ... on Question {
        ...QuestionDetailsFragment
      }
    }
  }
`;

export default function QuestionDetails({
  question,
}: {
  question: QuestionDetailsFragment$key;
}) {
  const data = useFragment(QuestionDetailsFragment, question);
  const [commitVoteMutation, isVoteMutationInFlight] = useMutation(
    QuestionDetailsVoteMutation
  );
  const [commitDeleteVoteMutation, isDeleteVoteMutationInFlight] = useMutation(
    QuestionDetailsDeleteVoteMutation
  );

  function handleVoteUp() {
    if (data.currentUserVote === "UPVOTE") {
      commitDeleteVoteMutation({
        variables: {
          questionId: data.id,
        },
      });
      return;
    }

    commitVoteMutation({
      variables: {
        voteType: "UPVOTE",
        questionId: data.id,
      },
    });
  }

  function handleVoteDown() {
    if (data.currentUserVote === "DOWNVOTE") {
      commitDeleteVoteMutation({
        variables: {
          questionId: data.id,
        },
      });
      return;
    }

    commitVoteMutation({
      variables: {
        voteType: "DOWNVOTE",
        questionId: data.id,
      },
    });
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Questions</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>{data.id}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-6">
        <div className="flex flex-col gap-2 items-center">
          <Button
            size="icon"
            variant="secondary"
            onClick={handleVoteUp}
            disabled={isVoteMutationInFlight || isDeleteVoteMutationInFlight}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">{data.votesCount}</h2>
          <Button
            size="icon"
            variant="secondary"
            onClick={handleVoteDown}
            disabled={isVoteMutationInFlight || isDeleteVoteMutationInFlight}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-full flex flex-col h-full justify-center gap-2">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {data.title}
          </h3>
          <p>{data.description}</p>
        </div>
      </div>
      {/* Display additional fields here */}
      <p className="text-muted-foreground text-sm">
        Asked at {dtf.format(new Date(data.createdAt))}
      </p>
    </div>
  );
}
