import { supabase } from "@/supabaseClient";
import { Database } from "@/supabaseInterface";
import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import { openConfirmModal, openContextModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { PencilSimple, TrashSimple } from "phosphor-react";

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

const mutateAdd = async (data: OrphanModel) => {
  await supabase.from(table).insert(
    data
  );
};
const mutateEdit = async (id: string, data: OrphanPayload) => {
  await supabase.from(table).update(data).eq('id', id);
};
const mutateDelete = async (id: string) => {
  await supabase.from(table).delete().eq("id", id);
};

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
  }, {
    header: "Aksi",
    cell: (ctx: any) => {
      return <Group>
        <ActionIcon color="blue" onClick={() => openContextModal({
          modal: editorModal as string,
          title: `Ubah ${entityName ?? "Entitas"}`,
          innerProps: {
            onClick: mutateEdit,
            initialValue: {},
          }
        })}><PencilSimple /></ActionIcon>
        <ActionIcon color="red" onClick={() => openConfirmModal({
          title: `Hapus ${entityName ?? "Entitas"}?`,
          centered: true,
          children: (
            <Text size="sm">
             Apakah anda yakin ingin menghapus {entityName ?? "Entitas"} ini, item yang sudah dihapus tidak dapat dikembalikan.
            </Text>
          ),
          labels: { confirm: 'Hapus', cancel: "Batal" },
          confirmProps: { color: 'red' },
          onCancel: () => {},
          onConfirm: () => mutateDelete(ctx?.row?.original?.id),
        })}><TrashSimple /></ActionIcon>
      </Group>;
    }
  }
]satisfies ColumnDef<any, unknown>[];

export const orphanRoute = {
  path: "/orphans",
  element: async () => import("@/components/modules/app/manager/ManagerModule").then(
    ({ default: Component }) => <Component />
  ),
  meta: {
    breadcrumb: () => entityName
  },
  loader: async () => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
      });
    }
    return ({
      entity: entityName,
      items: data || [],
      editorModal: editorModal,
      columns: columns,
      mutateAdd: mutateAdd,
      mutateEdit: mutateEdit,
      mutateDelete: mutateDelete,
    });
  }
};
