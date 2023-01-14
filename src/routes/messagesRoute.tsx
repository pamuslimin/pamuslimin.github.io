import { Badge } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
const table = 'messages';
const editorModal = "message-editor";
const entity = "Pesan";
const filterColumn = "sender_name";

const columns = [
  {
    header: "No",
    size: 10,
  },
  {
    header: "Pengirim",
    accessorKey: "sender_name"
  }, {
    header: "No. Telepon",
    accessorKey: "sender_phone"
  }, {
    header: "Subyek",
    accessorKey: "subject"
  },
  {
    header: "Dibalas",
    accessorKey: "replied",
    cell: (ctx: any) => {
      const replied = ctx?.cell?.getValue() as boolean;
      return <Badge color={replied ? "blue" : "green"}>{replied ? "Sudah Dibalas" : "Belum Dibalas"}</Badge>;
    }
  },
]satisfies ColumnDef<any, unknown>[];

export const messagesRoute = {
  path: "/messages",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),
  meta: {
    breadcrumb: () => "Pesan"
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
