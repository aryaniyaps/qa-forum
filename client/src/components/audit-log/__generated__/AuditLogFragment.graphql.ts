/**
 * @generated SignedSource<<98be36ed3f027ead5346e8a56d4dd17e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuditLogFragment$data = {
  readonly createdAt: any;
  readonly id: string;
  readonly newData: any | null | undefined;
  readonly oldData: any | null | undefined;
  readonly operation: string;
  readonly rowId: number;
  readonly tableName: string;
  readonly " $fragmentType": "AuditLogFragment";
};
export type AuditLogFragment$key = {
  readonly " $data"?: AuditLogFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuditLogFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuditLogFragment",
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
      "name": "tableName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "operation",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rowId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "oldData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "newData",
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
  "type": "AuditLog",
  "abstractKey": null
};

(node as any).hash = "9a87dbb51816098a37153af4c7e68f07";

export default node;
