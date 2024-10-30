import { dtf } from "@/lib/intl";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { AnswerFragment$key } from "./__generated__/AnswerFragment.graphql";

export const AnswerFragment = graphql`
  fragment AnswerFragment on Answer {
    id
    content
    createdAt
    updatedAt
  }
`;

type Props = {
  question: AnswerFragment$key;
  connectionId: string;
};

export default function Answer({ question }: Props) {
  const data = useFragment(AnswerFragment, question);

  return (
    <Card className="mb-4 group">
      <CardHeader>
        <CardDescription>{data.content}</CardDescription>
      </CardHeader>
      <CardFooter className="flex">
        <p className="text-xs text-muted-foreground">
          created at {dtf.format(new Date(data.createdAt))}
        </p>
      </CardFooter>
    </Card>
  );
}
