import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphql, useFragment, useMutation } from "react-relay";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { AnswerControllerFragment$key } from "./__generated__/AnswerControllerFragment.graphql";

const AnswerControllerFragment = graphql`
  fragment AnswerControllerFragment on Question
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
  ) {
    id
    answers(after: $cursor, first: $count)
      @connection(key: "AnswerListFragment_answers") {
      __id
      edges {
        # we have to select the edges field while
        # using the @connection directive
        __typename
      }
    }
  }
`;

const AnswerControllerCreateMutation = graphql`
  mutation AnswerControllerCreateMutation(
    $content: String!
    $questionId: ID!
    $connections: [ID!]!
  ) {
    createAnswer(content: $content, questionId: $questionId) {
      answerEdge @prependEdge(connections: $connections) {
        node {
          ...AnswerFragment
        }
      }
    }
  }
`;

const createAnswerSchema = z.object({
  content: z.string().min(1, { message: "content is required" }).max(500, {
    message: "content cannot be more than 500 characters",
  }),
});

type Props = {
  question: AnswerControllerFragment$key;
};

export default function AnswerController({ question }: Props) {
  const data = useFragment(AnswerControllerFragment, question);
  const [commitMutation, isMutationInFlight] = useMutation(
    AnswerControllerCreateMutation
  );

  const form = useForm<z.infer<typeof createAnswerSchema>>({
    resolver: zodResolver(createAnswerSchema),
    values: { content: "" },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createAnswerSchema>> = async (
    input
  ) => {
    form.reset();
    commitMutation({
      variables: {
        content: input.content,
        questionId: data.id,
        connections: [data.answers.__id],
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="write your answer here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isMutationInFlight}>
          Submit an answer
        </Button>
      </form>
    </Form>
  );
}
