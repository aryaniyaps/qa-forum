import { usePaginationFragment } from "react-relay";
import Question from "./Question";

import { useTransition } from "react";
import { graphql } from "relay-runtime";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { QuestionListFragment$key } from "./__generated__/QuestionListFragment.graphql";

const QuestionListFragment = graphql`
  fragment QuestionListFragment on Query
  @refetchable(queryName: "QuestionListPaginationQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
  ) {
    questions(after: $cursor, first: $count)
      @connection(key: "QuestionListFragment_questions") {
      __id
      edges {
        node {
          id
          ...QuestionFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

type Props = {
  rootQuery: QuestionListFragment$key;
};

export default function QuestionList({ rootQuery }: Props) {
  const [isPending, startTransition] = useTransition();
  const { data, loadNext } = usePaginationFragment(QuestionListFragment, rootQuery);

  function loadMore() {
    return startTransition(() => {
      loadNext(3);
    });
  }

  if (data.questions.edges.length === 0 && !data.questions.pageInfo.hasNextPage) {
    return (
      <div className="flex grow flex-col gap-4 px-4 items-center h-full">
        <p className="font-medium text-muted-foreground">
          Hmm, there are no questions yet
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex grow w-full flex-col gap-4 px-4">
      {data.questions.edges.map((questionEdge) => {
        return (
          <Question
            question={questionEdge.node}
            connectionId={data.questions.__id}
            key={questionEdge.node.id}
          />
        );
      })}
      {data.questions.pageInfo.hasNextPage && (
        <Button
          className="w-full"
          variant={"secondary"}
          onClick={loadMore}
          disabled={isPending}
        >
          load more
        </Button>
      )}
      {isPending && <p>loading</p>}
    </ScrollArea>
  );
}