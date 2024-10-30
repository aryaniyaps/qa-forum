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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { QuestionControllerFragment$key } from "./__generated__/QuestionControllerFragment.graphql";

const QuestionControllerFragment = graphql`
  fragment QuestionControllerFragment on Query
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
  ) {
    questions(after: $cursor, first: $count)
      @connection(key: "QuestionListFragment_questions") {
      __id
      edges {
        # we have to select the edges field while
        # using the @connection directive
        __typename
      }
    }
  }
`;

const QuestionControllerCreateMutation = graphql`
  mutation QuestionControllerCreateMutation(
    $title: String!
    $description: String!
    $connections: [ID!]!
  ) {
    createQuestion(title: $title, description: $description) {
      questionEdge @prependEdge(connections: $connections) {
        node {
          ...QuestionFragment
        }
      }
    }
  }
`;

const createQuestionSchema = z.object({
  title: z.string().min(1, { message: "title is required" }).max(250, {
    message: "title cannot be more than 250 characters",
  }),
  description: z.string().min(1, { message: "description is required" }).max(425, {
    message: "description cannot be more than 425 characters",
  })
});

type Props = {
  rootQuery: QuestionControllerFragment$key;
};

export default function QuestionController({ rootQuery }: Props) {
  const data = useFragment(QuestionControllerFragment, rootQuery);
  const [commitMutation, isMutationInFlight] = useMutation(
    QuestionControllerCreateMutation
  );

  const form = useForm<z.infer<typeof createQuestionSchema>>({
    resolver: zodResolver(createQuestionSchema),
    values: { title: "", description: "" },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createQuestionSchema>> = async (
    input
  ) => {
    form.reset();
    commitMutation({
      variables: { title: input.title, description: input.description, connections: [data.questions.__id] },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full px-4"
      >
                <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ask your question..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="write more about your question here..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isMutationInFlight}>
          Ask a question
        </Button>
      </form>
    </Form>
  );
}