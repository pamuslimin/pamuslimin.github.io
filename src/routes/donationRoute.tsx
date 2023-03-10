import MoneySpan from "@/components/elements/money-span/MoneySpan";
import { ColumnDef } from "@tanstack/react-table";

const table = 'donations';
const editorModal = "donation-editor";
const entity = "Donasi";
const status = "confirmed";
const filterColumn = "donorName";
const columns = [
  {
    header: "No",
    size: 10,
    cell: (ctx) => ctx?.row?.index + 1,
  },
  {
    header: "Donatur",
    accessorKey: "donorName"
  },
  {
    header: "Jumlah",
    accessorKey: "amount",
    cell: (ctx) => <MoneySpan amount={ctx?.row?.original?.amount} />,
  },
]satisfies ColumnDef<any, unknown>[];

export const donationRoute = {
  path: "/income",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),

  meta: {
    breadcrumb: () => entity
  },
  loader: async () => ({
    status,
    table,
    entity,
    editorModal,
    columns,
    filterColumn,
  })
};
