import { useFragment } from "react-relay";

import { APP_NAME } from "@/lib/constants";
import { Link } from "react-router-dom";
import { graphql } from "relay-runtime";
import { getAvatarUrl } from "../../lib/avatar";
import { NavBarFragment$key } from "./__generated__/NavBarFragment.graphql";

const NavBarFragment = graphql`
  fragment NavBarFragment on Query {
    viewer {
      username
    }
  }
`;

type Props = {
  rootQuery: NavBarFragment$key;
};

export default function NavBar({ rootQuery }: Props) {
  const data = useFragment(NavBarFragment, rootQuery);

  return (
    <nav className="w-full py-6 border-b-2 border-muted flex gap-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          {APP_NAME}
        </Link>
        <Link to="/audit-log" className="text-muted-foreground font-semibold">
          Audit Log
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <img
          src={getAvatarUrl(data.viewer.username)}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <p className="font-bold">{data.viewer.username}</p>
      </div>
    </nav>
  );
}
