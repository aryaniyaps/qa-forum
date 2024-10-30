import { dtf } from "@/lib/intl";
import { Slash } from "lucide-react";
import { graphql, useFragment } from "react-relay";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { QuestionDetailsFragment$key } from "./__generated__/QuestionDetailsFragment.graphql";

const QuestionDetailsFragment = graphql`
  fragment QuestionDetailsFragment on Question {
    id
    title
    description
    createdAt
  }
`;

export default function QuestionDetails({
  question,
}: {
  question: QuestionDetailsFragment$key;
}) {
  const data = useFragment(QuestionDetailsFragment, question);
  return (
    <div className="w-full flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Questions</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>{data.id}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full flex flex-col gap-2">
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {data.title}
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {data.description}
        </p>
      </div>
      {/* Display additional fields here */}
      <p className="text-muted-foreground text-sm">
        Asked at {dtf.format(new Date(data.createdAt))}
      </p>
    </div>
  );
}
