/**
 * @generated SignedSource<<cb508f8f27f8988d2645566bed4c25b6>>
 * @relayHash 4cb4d4b33e5e0fa9dbaf5ca7fee565cf
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4cb4d4b33e5e0fa9dbaf5ca7fee565cf

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AnswerControllerCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  content: string;
  questionId: string;
};
export type AnswerControllerCreateMutation$data = {
  readonly createAnswer: {
    readonly answerEdge: {
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"AnswerFragment">;
      };
    };
    readonly question: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"AnswerCountFragment">;
    };
  };
};
export type AnswerControllerCreateMutation = {
  response: AnswerControllerCreateMutation$data;
  variables: AnswerControllerCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "content"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "questionId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "content",
    "variableName": "content"
  },
  {
    "kind": "Variable",
    "name": "questionId",
    "variableName": "questionId"
  }
],
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AnswerControllerCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateAnswerPayload",
        "kind": "LinkedField",
        "name": "createAnswer",
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
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AnswerCountFragment"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AnswerEdge",
            "kind": "LinkedField",
            "name": "answerEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Answer",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AnswerFragment"
                  }
                ],
                "storageKey": null
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
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AnswerControllerCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateAnswerPayload",
        "kind": "LinkedField",
        "name": "createAnswer",
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "answersCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AnswerEdge",
            "kind": "LinkedField",
            "name": "answerEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Answer",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
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
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "answerEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4cb4d4b33e5e0fa9dbaf5ca7fee565cf",
    "metadata": {},
    "name": "AnswerControllerCreateMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "491703720b5bad3d0f20d05a7259937e";

export default node;
