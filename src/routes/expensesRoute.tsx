import { supabase } from "@/supabaseClient";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");
import { PencilSimple, TrashSimple } from "phosphor-react";

export const expensesRoute = {
  path: "/expenses",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),

  meta: {
    breadcrumb: () => "Pengeluaran"
  },
  loader: async () => {
    const { data, error } = await supabase.from("expenses").select("*");
    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
      });
    }
    console.log(data);
    return ({
      entity: "Pengeluaran",
      items: data || [],
      meta: {page: 1, length: data?.length},
      columns: [
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
