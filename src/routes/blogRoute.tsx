import { supabase } from "@/supabaseClient";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { PencilSimple, TrashSimple } from "phosphor-react";

export const blogRoute = {
  path: "/blog",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),
  
  meta: {
    breadcrumb: () => "Blog"
  },
  loader: async () => {
    const { data, error } = await supabase.from("blogs").select("*");
    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
      });
    }
    console.log(data);
    return ({
      entity: "Artikel",
      items: data || [],
      columns: [
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
