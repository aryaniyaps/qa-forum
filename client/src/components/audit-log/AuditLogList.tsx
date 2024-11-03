import { usePaginationFragment } from "react-relay";
import AuditLog from "./AuditLog";

import { useTransition } from "react";
import { graphql } from "relay-runtime";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { AuditLogListFragment$key } from "./__generated__/AuditLogListFragment.graphql";

const AuditLogListFragment = graphql`
  fragment AuditLogListFragment on Query
  @refetchable(queryName: "AuditLogListPaginationQuery")
  @argumentDefinitions(
    cursor: { type: "ID" }
    count: { type: "Int", defaultValue: 5 }
  ) {
    auditLogs(after: $cursor, first: $count)
      @connection(key: "AuditLogListFragment_auditLogs") {
      __id
      edges {
        node {
          id
          ...AuditLogFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

type Props = {
  rootQuery: AuditLogListFragment$key;
};

export default function AuditLogList({ rootQuery }: Props) {
  const [isPending, startTransition] = useTransition();
  const { data, loadNext } = usePaginationFragment(
    AuditLogListFragment,
    rootQuery
  );

  function loadMore() {
    return startTransition(() => {
      loadNext(3);
    });
  }

  if (
    data.auditLogs.edges.length === 0 &&
    !data.auditLogs.pageInfo.hasNextPage
  ) {
    return (
      <div className="flex grow flex-col gap-4 px-4 items-center h-full">
        <p className="font-medium text-muted-foreground">
          Hmm, there are no audit logs yet
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full flex flex-col gap-4 absolute pb-6">
        {data.auditLogs.edges.map((auditLogEdge) => {
          return (
            <AuditLog
              auditLog={auditLogEdge.node}
              connectionId={data.auditLogs.__id}
              key={auditLogEdge.node.id}
            />
          );
        })}
        {data.auditLogs.pageInfo.hasNextPage && (
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
      </div>
    </ScrollArea>
  );
}
