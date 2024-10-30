import AnswerController from "@/components/question-detail/AnswerController";
import AnswerCount from "@/components/question-detail/AnswerCount";
import AnswerList from "@/components/question-detail/AnswerList";
import QuestionDetails from "@/components/question-detail/QuestionDetails";
import { Separator } from "@/components/ui/separator";
import HomePageLayout from "@/layouts/HomePageLayout";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import { QuestionDetailPageQuery as QuestionDetailPageQueryType } from "./__generated__/QuestionDetailPageQuery.graphql";

const QuestionDetailPageQuery = graphql`
  query QuestionDetailPageQuery($questionId: ID!) {
    node(id: $questionId) {
      __typename
      ... on Question {
        ...AnswerCountFragment
        ...AnswerListFragment
        ...AnswerControllerFragment
        ...QuestionDetailsFragment
      }
    }
  }
`;

export default function QuestionDetailPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const data = useLazyLoadQuery<QuestionDetailPageQueryType>(
    QuestionDetailPageQuery,
    { questionId: questionId! }
  );

  return (
    <HomePageLayout>
      <div className="flex flex-col w-full h-full items-center gap-6 py-8">
        {data.node && data.node.__typename === "Question" ? (
          <>
            <QuestionDetails question={data.node} />
            <Separator />
            <AnswerCount question={data.node} />
            <AnswerList question={data.node} />
            <AnswerController question={data.node} />
          </>
        ) : (
          <p>Question not found</p>
        )}
      </div>
    </HomePageLayout>
  );
}
