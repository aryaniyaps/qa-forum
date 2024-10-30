/**
 * @generated SignedSource<<b813d212c453f12d21a2700af478ca7d>>
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
    readonly question: {
      readonly " $fragmentSpreads": FragmentRefs<"QuestionFragment">;
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
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionFragment"
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
              (v5/*: any*/),
              (v6/*: any*/)
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
                  (v5/*: any*/),
                  (v6/*: any*/)
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
    "cacheID": "b51b49f0452a787319ac542f16c925c4",
    "id": null,
    "metadata": {},
    "name": "AnswerControllerCreateMutation",
    "operationKind": "mutation",
    "text": "mutation AnswerControllerCreateMutation(\n  $content: String!\n  $questionId: ID!\n) {\n  createAnswer(content: $content, questionId: $questionId) {\n    question {\n      ...QuestionFragment\n      id\n    }\n    answerEdge {\n      node {\n        ...AnswerFragment\n        id\n      }\n    }\n  }\n}\n\nfragment AnswerFragment on Answer {\n  id\n  content\n  createdAt\n  updatedAt\n}\n\nfragment QuestionFragment on Question {\n  id\n  title\n  descriptionPreview\n  answersCount\n  createdAt\n  updatedAt\n}\n"
  }
};
})();

(node as any).hash = "5860ef226ef66813f75db6496951b13b";

export default node;
