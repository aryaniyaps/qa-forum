import NavBar from "@/components/home-page/NavBar";
import QuestionController from "@/components/home-page/QuestionController";
import QuestionList from "@/components/home-page/QuestionList";
import HomePageLayout from "@/layouts/HomePageLayout";
import { graphql, useLazyLoadQuery } from "react-relay";
import { HomePageQuery as HomePageQueryType } from "./__generated__/HomePageQuery.graphql";

const HomePageQuery = graphql`
  query HomePageQuery {
    ...QuestionListFragment
    ...QuestionControllerFragment
    ...NavBarFragment
  }
`;
export default function HomePage() {
  const rootQuery = useLazyLoadQuery<HomePageQueryType>(HomePageQuery, {});
  return (
    <HomePageLayout>
      <NavBar rootQuery={rootQuery} />
      <div className="flex w-full h-full justify-center gap-8 py-8">
        <div className="w-full flex flex-col gap-4">
          <QuestionController rootQuery={rootQuery} />
        </div>
        <QuestionList rootQuery={rootQuery} />
      </div>
    </HomePageLayout>
  );
}
