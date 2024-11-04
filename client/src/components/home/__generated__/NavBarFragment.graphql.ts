/**
 * @generated SignedSource<<c6bb3e1ceeb947048fe14a55201555b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavBarFragment$data = {
  readonly viewer: {
    readonly username: string;
  };
  readonly " $fragmentType": "NavBarFragment";
};
export type NavBarFragment$key = {
  readonly " $data"?: NavBarFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavBarFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavBarFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "viewer",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "80b67901e6724f68a62418167d6dfc24";

export default node;
