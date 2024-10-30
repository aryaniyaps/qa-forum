/**
 * @generated SignedSource<<10a9aa79f52f4931ac9239e628cecb49>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionFragment$data = {
  readonly createdAt: any;
  readonly description: string;
  readonly id: string;
  readonly title: string;
  readonly updatedAt: any | null | undefined;
  readonly " $fragmentType": "QuestionFragment";
};
export type QuestionFragment$key = {
  readonly " $data"?: QuestionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionFragment",
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
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    }
  ],
  "type": "Question",
  "abstractKey": null
};

(node as any).hash = "163aacb6551a7d82a7f74560d7a42678";

export default node;
