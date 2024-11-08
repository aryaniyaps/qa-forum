/**
 * @generated SignedSource<<73060e7f8c94a2ed4cbd66662b04b206>>
 * @relayHash 4d99575c106e330fd447be13d263ccc4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4d99575c106e330fd447be13d263ccc4

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionDetailsDeleteVoteMutation$variables = {
  questionId: string;
};
export type QuestionDetailsDeleteVoteMutation$data = {
  readonly deleteQuestionVote: {
    readonly __typename: "Question";
    readonly " $fragmentSpreads": FragmentRefs<"QuestionDetailsFragment">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type QuestionDetailsDeleteVoteMutation = {
  response: QuestionDetailsDeleteVoteMutation$data;
  variables: QuestionDetailsDeleteVoteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "questionId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "questionId",
    "variableName": "questionId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestionDetailsDeleteVoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "deleteQuestionVote",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestionDetailsDeleteVoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "deleteQuestionVote",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
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
              (v3/*: any*/)
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
    "id": "4d99575c106e330fd447be13d263ccc4",
    "metadata": {},
    "name": "QuestionDetailsDeleteVoteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8310e8d59d8bf6ef5563140017e1cc80";

export default node;
