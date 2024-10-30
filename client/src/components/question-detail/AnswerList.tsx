import { usePaginationFragment } from "react-relay";
import Answer from "./Answer.tsx";

import { useTransition } from "react";
import { graphql } from "relay-runtime";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { AnswerListFragment$key } from "./__generated__/AnswerListFragment.graphql";

const AnswerListFragment = graphql`
  fragment AnswerListFragment on Question
  @refetchable(queryName: "AnswerListPaginationQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
  ) {
    answers(after: $cursor, first: $count)
      @connection(key: "AnswerListFragment_answers") {
      __id
      edges {
        node {
          id
          ...AnswerFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

type Props = {
  question: AnswerListFragment$key;
};

export default function AnswerList({ question }: Props) {
  const [isPending, startTransition] = useTransition();
  const { data, loadNext } = usePaginationFragment(
    AnswerListFragment,
    question
  );

  function loadMore() {
    return startTransition(() => {
      loadNext(3);
    });
  }

  if (data.answers.edges.length === 0 && !data.answers.pageInfo.hasNextPage) {
    return <div className="h-full w-full"></div>;
  }

  return (
    <ScrollArea className="flex grow w-full flex-col gap-4">
      {data.answers.edges.map((answerEdge) => {
        return (
          <Answer
            question={answerEdge.node}
            connectionId={data.answers.__id}
            key={answerEdge.node.id}
          />
        );
      })}
      {data.answers.pageInfo.hasNextPage && (
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
