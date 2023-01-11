import { supabase } from "@/supabaseClient";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { PencilSimple, TrashSimple } from "phosphor-react";

export const messagesRoute = {
  path: "/messages",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),

  meta: {
    breadcrumb: () => "Pesan"
  },
  loader: async () => {
    const { data, error } = await supabase.from("messages").select("*");
    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
      });
    }
    return ({
      entity: "Pesan",
      items: data || [],
      columns: [
        {
          header: "No",
          size: 10,
        },
        {
          header: "Pengirim",
          accessorKey: "sender_name"
        }, {
          header: "No. Telpon",
          accessorKey: "sender_phone"
        }, {
          header: "Subyek",
          accessorKey: "subject"
        },
        {
          header: "Replied",
          accessorKey: "replied",
          cell: (ctx: any) => {
            const replied = ctx?.cell?.getValue() as boolean;
            return <Badge color={replied ? "blue" : "green"}>{replied ? "Sudah Dibalas" : "Belum Dibalas"}</Badge>;
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
