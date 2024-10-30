/**
 * @generated SignedSource<<542335b60a2ee94f1f6c72568e2f3eb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AnswerFragment$data = {
  readonly content: string;
  readonly createdAt: any;
  readonly id: string;
  readonly updatedAt: any | null | undefined;
  readonly " $fragmentType": "AnswerFragment";
};
export type AnswerFragment$key = {
  readonly " $data"?: AnswerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AnswerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AnswerFragment",
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
      "name": "content",
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
  "type": "Answer",
  "abstractKey": null
};

(node as any).hash = "4fa64878ff1fc00968a40a34e11d8112";

export default node;
