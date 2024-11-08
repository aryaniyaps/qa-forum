/**
 * @generated SignedSource<<aed829d227d0a8cd56a420de72e878a6>>
 * @relayHash b7af1346f80c30e5b5441b0ac0d94469
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b7af1346f80c30e5b5441b0ac0d94469

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VoteType = "DOWNVOTE" | "UPVOTE" | "%future added value";
export type QuestionDetailsVoteMutation$variables = {
  questionId: string;
  voteType: VoteType;
};
export type QuestionDetailsVoteMutation$data = {
  readonly voteQuestion: {
    readonly __typename: "Question";
    readonly " $fragmentSpreads": FragmentRefs<"QuestionDetailsFragment">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type QuestionDetailsVoteMutation = {
  response: QuestionDetailsVoteMutation$data;
  variables: QuestionDetailsVoteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "questionId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "voteType"
},
v2 = [
  {
    "kind": "Variable",
    "name": "questionId",
    "variableName": "questionId"
  },
  {
    "kind": "Variable",
    "name": "voteType",
    "variableName": "voteType"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestionDetailsVoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "voteQuestion",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionDetailsFragment"
              }
            ],
            "type": "Question",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "QuestionDetailsVoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "voteQuestion",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
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
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/)
            ],
            "type": "Node",
            "abstractKey": "__isNode"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b7af1346f80c30e5b5441b0ac0d94469",
    "metadata": {},
    "name": "QuestionDetailsVoteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a4b285ba5a69ec3725e97496630456f6";

export default node;
