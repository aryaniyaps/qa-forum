import QuestionController from "@/components/home-page/QuestionController";
import QuestionList from "@/components/home-page/QuestionList";
import HomePageLayout from "@/layouts/HomePageLayout";
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
      <div className="flex items-start w-full h-full justify-center gap-8 py-8">
        <QuestionController rootQuery={rootQuery} />
        <QuestionList rootQuery={rootQuery} />
      </div>
    </HomePageLayout>
  );
}
