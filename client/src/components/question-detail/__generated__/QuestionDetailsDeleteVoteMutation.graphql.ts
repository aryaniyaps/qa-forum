/**
 * @generated SignedSource<<9e7985084e87f6da716d758c9904b284>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionDetailsDeleteVoteMutation$variables = {
  questionId: string;
};
export type QuestionDetailsDeleteVoteMutation$data = {
  readonly deleteQuestionVote: {
    readonly question: {
      readonly " $fragmentSpreads": FragmentRefs<"QuestionDetailsFragment">;
    };
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
];
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
        "concreteType": "DeleteQuestionVotePayload",
        "kind": "LinkedField",
        "name": "deleteQuestionVote",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestionDetailsDeleteVoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteQuestionVotePayload",
        "kind": "LinkedField",
        "name": "deleteQuestionVote",
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
    "cacheID": "4a742c092c449db87fb51720ae552d49",
    "id": null,
    "metadata": {},
    "name": "QuestionDetailsDeleteVoteMutation",
    "operationKind": "mutation",
    "text": "mutation QuestionDetailsDeleteVoteMutation(\n  $questionId: ID!\n) {\n  deleteQuestionVote(questionId: $questionId) {\n    question {\n      ...QuestionDetailsFragment\n      id\n    }\n  }\n}\n\nfragment QuestionDetailsFragment on Question {\n  id\n  title\n  description\n  votesCount\n  currentUserVote\n  createdAt\n}\n"
  }
};
})();

(node as any).hash = "cba2696a38e174a0e13c70e89fb2dc38";

export default node;
