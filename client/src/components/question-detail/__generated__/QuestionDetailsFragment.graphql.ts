/**
 * @generated SignedSource<<4764521356022bcb5ffca896d8ab56ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionDetailsFragment$data = {
  readonly createdAt: any;
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
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "Question",
  "abstractKey": null
};

(node as any).hash = "802fd4bb854ad85d0fa1fea039c1781e";

export default node;
