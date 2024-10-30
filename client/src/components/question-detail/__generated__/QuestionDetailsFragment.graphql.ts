/**
 * @generated SignedSource<<66cadc3b10249315e419a1dc7b5a7164>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type VoteType = "DOWNVOTE" | "UPVOTE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type QuestionDetailsFragment$data = {
  readonly createdAt: any;
  readonly currentUserVote: VoteType | null | undefined;
  readonly description: string;
  readonly id: string;
  readonly title: string;
  readonly votesCount: number;
  readonly " $fragmentType": "QuestionDetailsFragment";
};
export type QuestionDetailsFragment$key = {
  readonly " $data"?: QuestionDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionDetailsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionDetailsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "votesCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentUserVote",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "Question",
  "abstractKey": null
};

(node as any).hash = "d2c9d1d8579ba4c81a6ed0fad21d8180";

export default node;
