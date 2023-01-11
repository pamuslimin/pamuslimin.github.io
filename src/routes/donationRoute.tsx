import { supabase } from "@/supabaseClient";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { PencilSimple, TrashSimple } from "phosphor-react";

export const donationRoute = {
  path: "/income",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),

  meta: {
    breadcrumb: () => "Donasi"
  },
  loader: async () => {
    const { data, error } = await supabase.from("donations").select("*");
    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
      });
    }
    console.log(data);
    return ({
      entity: "Donasi",
      items: data || [],
      columns: [
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
          accessorFn: (row) => `Rp. ${row?.amount}`,
        },
        {
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
