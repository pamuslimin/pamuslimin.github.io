import { Badge } from "@mantine/core";
import { Route } from "@tanstack/react-location";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export type OrphanModel = {
  additional_info?: string | null;
  avatar_url?: string | null;
  birthdate?: string | null;
  birthplace?: string | null;
  full_name?: string;
  gender?: boolean | null;
  id?: string;
  medical_history?: string | null;
  status?: string | null;
};

export type OrphanPayload = OrphanModel;

const table = 'orphans';
const editorModal = "orphan-editor";
const entityName = "Anak Asuh";
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
    header: "Umur",
    accessorKey: "birthdate",
    accessorFn: (row) => `${dayjs().diff(row?.birthdate, "year", false)} tahun`,
  },
  {
    header: "Jenis Kelamin",
    accessorFn: (row) => row?.gender ? "Laki Laki" : "Perempuan"
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (ctx: any) => {
      return <Badge color="green">{ctx?.cell?.getValue()}</Badge>;
    }
  },
]satisfies ColumnDef<any, unknown>[];

export const orphanRoute: Route = {
  path: "/orphans",
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
        birthdate: "2001-1-1"
      }
    });
  }
};
