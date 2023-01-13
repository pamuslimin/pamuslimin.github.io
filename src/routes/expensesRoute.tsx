import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");


const table = 'expenses';
const editorModal = "expenses-editor";
const entity = "Pengeluaran";
const filterColumn = "description";
const columns = [
  {
    header: "No",
    size: 10,
    cell: (ctx) => ctx?.row?.index + 1,
  }, {
    header: "Tanggal Keluar",
    accessorKey: "date",
    accessorFn: row => dayjs(row?.date).toString(),
  },
  {
    header: "Deskripsi",
    accessorKey: "description"
  },
  {
    header: "Jumlah",
    accessorKey: "amount",
    accessorFn: (row) => `Rp. ${row?.amount}`
  },
]satisfies ColumnDef<any, unknown>[];

export const expensesRoute = {
  path: "/expenses",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),

  meta: {
    breadcrumb: () => entity
  },
  loader: async () => {

    return ({
      table,
      entity,
      editorModal,
      columns,
      filterColumn,
      initialValues: {
        date: dayjs().format("YYYY-MM-DD")
      }
    });
  }
};
