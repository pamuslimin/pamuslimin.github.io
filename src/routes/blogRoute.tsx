import { Badge } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";

const table = 'blogs';
const editorModal = "blog-editor";
const entity = "Blog";
const filterColumn = "title";

const columns = [
  {
    header: "No",
    size: 10,
    cell: (ctx) => ctx?.row?.index + 1,
  },
  {
    header: "Judul",
    accessorKey: "title"
  },
  {
    header: "Jumlah Kata",
    accessorFn: (row) => `${row?.content?.split(" ").length}`,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (ctx: any) => {
      return <Badge color="green">{ctx?.cell?.getValue()}</Badge>;
    }
  },
]satisfies ColumnDef<any, unknown>[];
export const blogRoute = {
  path: "/blog",
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
    });
  }
};
