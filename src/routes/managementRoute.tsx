import { Badge } from "@mantine/core";
import { Route } from "@tanstack/react-location";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";


const table = 'managements';
const editorModal = "management-editor";
const entityName = "Pengurus";
const filterColumn = "full_name";

const columns = [
  {
    header: "No",
    size: 10,
    cell: (ctx) => ctx?.row?.index + 1,
  },
  {
    header: "Nama Lengkap",
    accessorKey: "full_name"
  },
  {
    header: "Jenis Kelamin",
    accessorFn: (row) => row?.gender ? "Laki Laki" : "Perempuan"
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (ctx: any) => {
      const val = ctx?.cell?.getValue() as string;
      return <Badge color={val === "aktif"? "green": "gray"}>{val}</Badge>;
    }
  },
  {
    header: "Jabatan",
    accessorKey: "role",
    cell: (ctx: any) => {
      const val = ctx?.cell?.getValue() as string;
      return <Badge color={val?.toLocaleLowerCase() === "kepala pengurus" ? "blue" : "teal"}>{val}</Badge>;
    }
  },
  {
    header: "Umur",
    accessorKey: "birthdate",
    accessorFn: (row) => `${dayjs().diff(row?.birthdate, "year", false)} tahun`,
  },
]satisfies ColumnDef<any, unknown>[];

export const managementRoute: Route = {
  path: "/managements",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),
  meta: {
    breadcrumb: () => entityName
  },
  loader: async ({ search: { page, filter, ...searches } }) => {
    return ({
      table,
      entity: entityName,
      editorModal,
      columns,
      filterColumn,
      initialValues: {
        birthdate: "2001-1-1",
        status: "aktif",
        role: "pengurus"
      }
    });
  }
};
