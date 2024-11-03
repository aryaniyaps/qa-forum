import NavBar from "@/components/home/NavBar";
import QuestionController from "@/components/home/QuestionController";
import QuestionList from "@/components/home/QuestionList";
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
      <div className="flex w-full h-full flex-1 justify-center gap-8">
        <div className="w-full flex flex-col gap-4">
          <QuestionController rootQuery={rootQuery} />
        </div>
        <QuestionList rootQuery={rootQuery} />
      </div>
    </HomePageLayout>
  );
}
