/**
 * @generated SignedSource<<6f282450c19bd2fc551f529b20fa7851>>
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
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "Question",
  "abstractKey": null
};

(node as any).hash = "8158c5eb020137065de643fb89432159";

export default node;
