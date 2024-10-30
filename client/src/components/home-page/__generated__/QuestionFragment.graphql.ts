/**
 * @generated SignedSource<<91039c2856437adae027c877b3cab3f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionFragment$data = {
  readonly answersCount: number;
  readonly createdAt: any;
  readonly descriptionPreview: string;
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
      "name": "descriptionPreview",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "answersCount",
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

(node as any).hash = "5a8f8cd3506c94b0cbe8f1c9c6390d01";

export default node;
