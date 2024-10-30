import QuestionController from "@/components/home-page/QuestionController";
import QuestionList from "@/components/home-page/QuestionList";
import HomePageLayout from "@/layouts/HomePageLayout";
import { APP_NAME } from "@/lib/constants";
import { graphql, useLazyLoadQuery } from "react-relay";
import { HomePageQuery as HomePageQueryType } from "./__generated__/HomePageQuery.graphql";

const HomePageQuery = graphql`
  query HomePageQuery {
    ...QuestionListFragment
    ...QuestionControllerFragment
  }
`;
export default function HomePage() {
  const rootQuery = useLazyLoadQuery<HomePageQueryType>(HomePageQuery, {});
  return (
    <HomePageLayout>
      <div className="flex w-full h-full justify-center gap-8 py-8">
        <div className="w-full flex flex-col gap-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {APP_NAME}
          </h2>
          <QuestionController rootQuery={rootQuery} />
        </div>
        <QuestionList rootQuery={rootQuery} />
      </div>
    </HomePageLayout>
  );
}
