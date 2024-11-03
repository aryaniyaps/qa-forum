import { dtf } from "@/lib/intl";
import { useFragment } from "react-relay";
import { Link } from "react-router-dom";
import { graphql } from "relay-runtime";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { QuestionFragment$key } from "./__generated__/QuestionFragment.graphql";

export const QuestionFragment = graphql`
  fragment QuestionFragment on Question {
    id
    title
    descriptionPreview
    answersCount
    votesCount
    createdAt
    updatedAt
  }
`;

type Props = {
  question: QuestionFragment$key;
  connectionId: string;
};

export default function Question({ question }: Props) {
  const data = useFragment(QuestionFragment, question);

  return (
    <Link to={`/questions/${data.id}`} className="group">
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="break-words">{data.title}</p>
          </CardTitle>
          <CardDescription>{data.descriptionPreview}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              {data.votesCount} votes
            </p>
            <p className="text-xs text-muted-foreground">
              {data.answersCount} answers
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            created at {dtf.format(new Date(data.createdAt))}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
