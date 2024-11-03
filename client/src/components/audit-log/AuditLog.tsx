import { dtf } from "@/lib/intl";
import { useFragment } from "react-relay";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { graphql } from "relay-runtime";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AuditLogFragment$key } from "./__generated__/AuditLogFragment.graphql";
export const AuditLogFragment = graphql`
  fragment AuditLogFragment on AuditLog {
    id
    tableName
    operation
    rowId
    oldData
    newData
    createdAt
  }
`;

type Props = {
  auditLog: AuditLogFragment$key;
  connectionId: string;
};

export default function AuditLog({ auditLog }: Props) {
  const data = useFragment(AuditLogFragment, auditLog);

  return (
    <Card className="mb-4 group">
      <CardHeader>
        <CardTitle>
          <p className="break-words">
            {data.tableName} {data.operation} ID {data.rowId}
          </p>
        </CardTitle>
        <CardDescription>
          created at {dtf.format(new Date(data.createdAt))}
        </CardDescription>
        <CardContent className="flex flex-col px-0 pt-4 gap-4 items-stretch">
          {!data.oldData && (
            <div className="flex flex-col gap-2 flex-1 h-full min-h-full">
              <p className="text-sm font-semibold">Previous Data</p>
              <SyntaxHighlighter
                language="json"
                style={atomOneDark}
                wrapLines
                wrapLongLines
                showLineNumbers
                customStyle={{ height: "100%" }}
              >
                {JSON.stringify(data.oldData, null, 2)}
              </SyntaxHighlighter>
            </div>
          )}
          {data.newData && (
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm font-semibold">Subsequent Data</p>
              <SyntaxHighlighter
                language="json"
                style={atomOneDark}
                wrapLines
                wrapLongLines
                showLineNumbers
              >
                {JSON.stringify(data.newData, null, 2)}
              </SyntaxHighlighter>
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
