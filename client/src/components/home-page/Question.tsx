import { dtf } from "@/lib/intl";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { QuestionFragment$key } from "./__generated__/QuestionFragment.graphql";

export const QuestionFragment = graphql`
  fragment QuestionFragment on Question {
    id
    title
    description
    createdAt
    updatedAt
  }
`;


type Props = {
  question: QuestionFragment$key;
  connectionId: string;
};

export default function Question({ question, connectionId }: Props) {
  const data = useFragment(QuestionFragment, question);

  return (
    <Card className="mb-4 group">
      <CardHeader>
        <CardTitle
        >
          <p className="break-words">{data.title}</p>
        </CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex">
        <p className="text-xs text-muted-foreground">
          created at {dtf.format(new Date(data.createdAt))}
        </p>
      </CardFooter>
    </Card>
  );
}