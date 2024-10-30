/**
 * @generated SignedSource<<682953961f435e3762e5b9fc85a1d894>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
];
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
    "cacheID": "75dbb14bc9a2a51e4fd8b13260be159c",
    "id": null,
    "metadata": {},
    "name": "AnswerControllerCreateMutation",
    "operationKind": "mutation",
    "text": "mutation AnswerControllerCreateMutation(\n  $content: String!\n  $questionId: ID!\n) {\n  createAnswer(content: $content, questionId: $questionId) {\n    answerEdge {\n      node {\n        ...AnswerFragment\n        id\n      }\n    }\n  }\n}\n\nfragment AnswerFragment on Answer {\n  id\n  content\n  createdAt\n  updatedAt\n}\n"
  }
};
})();

(node as any).hash = "647faf0292d4ad62ec2d4e7482fe8cbf";

export default node;
