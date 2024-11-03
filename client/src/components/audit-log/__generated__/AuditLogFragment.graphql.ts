/**
 * @generated SignedSource<<992c6c1d7e73833a9f0d5dc256db7a4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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
