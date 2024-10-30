/**
 * @generated SignedSource<<ba1c56bad21e4cb8f2a9499530d827d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionControllerCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  description: string;
  title: string;
};
export type QuestionControllerCreateMutation$data = {
  readonly createQuestion: {
    readonly questionEdge: {
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"QuestionFragment">;
      };
    };
  };
};
export type QuestionControllerCreateMutation = {
  response: QuestionControllerCreateMutation$data;
  variables: QuestionControllerCreateMutation$variables;
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
  "name": "description"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v3 = [
  {
    "kind": "Variable",
    "name": "description",
    "variableName": "description"
  },
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "title"
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
    "name": "QuestionControllerCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateQuestionPayload",
        "kind": "LinkedField",
        "name": "createQuestion",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QuestionEdge",
            "kind": "LinkedField",
            "name": "questionEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Question",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionFragment"
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "QuestionControllerCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateQuestionPayload",
        "kind": "LinkedField",
        "name": "createQuestion",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QuestionEdge",
            "kind": "LinkedField",
            "name": "questionEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Question",
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
            "name": "questionEdge",
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
    "cacheID": "5c70af6e4552e7e5e961011f6f7a80c7",
    "id": null,
    "metadata": {},
    "name": "QuestionControllerCreateMutation",
    "operationKind": "mutation",
    "text": "mutation QuestionControllerCreateMutation(\n  $title: String!\n  $description: String!\n) {\n  createQuestion(title: $title, description: $description) {\n    questionEdge {\n      node {\n        ...QuestionFragment\n        id\n      }\n    }\n  }\n}\n\nfragment QuestionFragment on Question {\n  id\n  title\n  descriptionPreview\n  answersCount\n  createdAt\n  updatedAt\n}\n"
  }
};
})();

(node as any).hash = "39652e8b968a86cd53ce6be1c93f3cf4";

export default node;
