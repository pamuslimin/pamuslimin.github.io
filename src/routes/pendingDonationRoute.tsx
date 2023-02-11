import MoneySpan from "@/components/elements/money-span/MoneySpan";
import { ColumnDef } from "@tanstack/react-table";

const table = 'donations';
const status = "pending";
const editorModal = "donation-editor";
const entity = "Donasi Tertahan";
const filterColumn = "donatur";
const columns = [
  {
    header: "No",
    size: 10,
    cell: (ctx) => ctx?.row?.index + 1,
  },
  {
    header: "Donatur",
    accessorKey: "donatur"
  },
  {
    header: "active",
    accessorKey: "conf",
  },
]satisfies ColumnDef<any, unknown>[];

export const pendingDonationRoute = {
  path: "/pending",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),

  meta: {
    breadcrumb: () => entity
  },
  loader: async () => ({
    table,
    entity,
    editorModal,
    columns,
    filterColumn,
    status,
  })
};
