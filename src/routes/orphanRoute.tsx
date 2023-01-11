import { supabase } from "@/supabaseClient";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { PencilSimple, TrashSimple } from "phosphor-react";

export const orphanRoute = {
  path: "/orphans",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),
  meta: {
    breadcrumb: () => "Anak Asuh"
  },
  loader: async () => {
    const { data, error } = await supabase.from("orphans").select("*");
    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
      });
    }
    console.log(data);
    return ({
      entity: "Anak Asuh",
      items: data || [],
      columns: [
        {
          header: "No",
          size: 10,
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
        }, {
          header: "Aksi",
          cell: (ctx: any) => {
            return <Group>
              <ActionIcon color="blue"><PencilSimple /></ActionIcon>
              <ActionIcon color="red"><TrashSimple /></ActionIcon>
            </Group>;
          }
        }
      ]satisfies ColumnDef<any, unknown>[],
      mutateAdd: () => { },
      mutateEdit: () => { },
      mutateDelete: () => { },
    });
  }
};
