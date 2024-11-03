/**
 * @generated SignedSource<<1e056b79592c1c7df31dba2619b86432>>
 * @relayHash 0858b241514fb222893dd499c8cabbe8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0858b241514fb222893dd499c8cabbe8

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VoteType = "DOWNVOTE" | "UPVOTE" | "%future added value";
export type QuestionDetailsVoteMutation$variables = {
  questionId: string;
  voteType: VoteType;
};
export type QuestionDetailsVoteMutation$data = {
  readonly voteQuestion: {
    readonly question: {
      readonly " $fragmentSpreads": FragmentRefs<"QuestionDetailsFragment">;
    };
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
];
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
        "concreteType": "VoteQuestionPayload",
        "kind": "LinkedField",
        "name": "voteQuestion",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Question",
            "kind": "LinkedField",
            "name": "question",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionDetailsFragment"
              }
            ],
            "storageKey": null
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
        "concreteType": "VoteQuestionPayload",
        "kind": "LinkedField",
        "name": "voteQuestion",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Question",
            "kind": "LinkedField",
            "name": "question",
            "plural": false,
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "0858b241514fb222893dd499c8cabbe8",
    "metadata": {},
    "name": "QuestionDetailsVoteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "27c61d1abe420bf00a46ea971b2cb202";

export default node;
