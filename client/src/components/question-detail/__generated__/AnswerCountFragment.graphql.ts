/**
 * @generated SignedSource<<088b129da621295fbd7437a57eff1a14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AnswerCountFragment$data = {
  readonly answersCount: number;
  readonly " $fragmentType": "AnswerCountFragment";
};
export type AnswerCountFragment$key = {
  readonly " $data"?: AnswerCountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AnswerCountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AnswerCountFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "answersCount",
      "storageKey": null
    }
  ],
  "type": "Question",
  "abstractKey": null
};

(node as any).hash = "5ddb2df485343e4b7af6ab426b336307";

export default node;
