import { useFragment } from "react-relay";

import { graphql } from "relay-runtime";
import { AnswerCountFragment$key } from "./__generated__/AnswerCountFragment.graphql";

const AnswerCountFragment = graphql`
  fragment AnswerCountFragment on Question {
    answersCount
  }
`;

type Props = {
  question: AnswerCountFragment$key;
};

export default function AnswerCount({ question }: Props) {
  const data = useFragment(AnswerCountFragment, question);

  return (
    <p className="w-full text-xl text-muted-foreground">
      Answers ({data.answersCount})
    </p>
  );
}
