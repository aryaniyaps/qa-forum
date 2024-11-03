import AuditLogList from "@/components/audit-log/AuditLogList";
import NavBar from "@/components/home/NavBar";
import HomePageLayout from "@/layouts/HomePageLayout";
import { graphql, useLazyLoadQuery } from "react-relay";
import { AuditLogPageQuery as AuditLogPageQueryType } from "./__generated__/AuditLogPageQuery.graphql";

const AuditLogPageQuery = graphql`
  query AuditLogPageQuery {
    ...AuditLogListFragment
    ...NavBarFragment
  }
`;
export default function AuditLogPage() {
  const rootQuery = useLazyLoadQuery<AuditLogPageQueryType>(
    AuditLogPageQuery,
    {}
  );
  return (
    <HomePageLayout>
      <NavBar rootQuery={rootQuery} />
      <div className="flex w-full h-full flex-1 justify-center">
        <AuditLogList rootQuery={rootQuery} />
      </div>
    </HomePageLayout>
  );
}
