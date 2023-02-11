import { useDataTable, useDataTableProps } from '@/components/elements/data-table/useDataTable';
import SearchBar from '@/components/elements/search-bar/SearchBar';
import useQuery from '@/hooks/useQuery';
import { supabase } from '@/supabaseClient';
import { ActionIcon, Button, Card, Container, Group, Stack, Text } from '@mantine/core';
import { openConfirmModal, openContextModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { ColumnDef } from '@tanstack/react-table';
import { Download, PencilSimple, Plus, TrashSimple } from 'phosphor-react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext, } from './AppContext';

type Props = {};



const ManagerModule = (props: Props) => {
    const { data: {
        entity,
        table,
        columns,
        filterColumn,
        editorModal,
        initialValues,
        status,
    } } = useMatch();
    const { items, metas, filter, setFilter, setPage, setStatus, getAllItem, updateItem, deleteItem, addItem } = useContext(AppContext);

    const columnswithActions: ColumnDef<any, unknown>[] = [
        ...(columns as ColumnDef<any, unknown>[]),

        {
            header: "Aksi",
            cell: (ctx: any) => {
                return <Group>
                    <ActionIcon color="blue" onClick={() => openContextModal({
                        modal: editorModal as string,
                        title: `Ubah ${entity ?? "Entitas"}`,
                        innerProps: {
                            onClick: (data: any) => updateItem?.(table as string, data),
                            initialValues: { ...ctx?.row?.original },
                        }
                    })}><PencilSimple /></ActionIcon>
                    <ActionIcon color="red" onClick={() => openConfirmModal({
                        title: `Hapus ${entity ?? "Entitas"}?`,
                        centered: true,
                        children: (
                            <Text size="sm">
                                {`Apakah anda yakin ingin menghapus ${entity ?? "Entitas"} ini, item yang sudah dihapus tidak dapat dikembalikan.`}
                            </Text>
                        ),
                        labels: { confirm: 'Hapus', cancel: "Batal" },
                        confirmProps: { color: 'red' },
                        onCancel: () => { },
                        onConfirm: () => deleteItem?.(table as string, ctx?.row?.original?.id),
                    })}><TrashSimple /></ActionIcon>
                </Group>;
            }
        }];

    const [state, setState] = useState<any>({});
    const {
        Component
    } = useDataTable({
        queryHook: {
            data: items?.[table as string] ?? [],
            meta: metas?.[table as string] ?? {},
        },
        state, setState,
        columns: columnswithActions,
    }satisfies useDataTableProps<any>);

    useEffect(() => {
        setStatus(status);
        getAllItem?.(table as string, status as string);
    }, [table]);

    useEffect(() => {
        if (state?.pagination?.pageIndex) {
            setPage(state?.pagination?.pageIndex);
            getAllItem?.(table as string, status as string);
        }
    }, [state?.pagination]);

    useEffect(() => {

        getAllItem?.(table as string, status as string, filterColumn as string ?? undefined);
    }, [filter]);

    return (

        <Container size="xl">
            <Stack>
                <Group position='apart' mt={16}>
                    <Group>
                        <Button leftIcon={<Plus weight='bold' />} onClick={() => openContextModal({
                            modal: editorModal as string,
                            title: `Tambah ${entity ?? "Entitas"}`,
                            innerProps: {
                                onClick: (data: any) => addItem?.(table as string, data),
                                initialValues: initialValues,
                            }
                        })}>{`Tambah ${entity ?? "Entitas"}`}</Button>
                        <Button leftIcon={<Download weight='bold' />} variant="outline">{`Download CSV`}</Button></Group>
                    <SearchBar onClick={(value) => setFilter(value)} />
                </Group>
                <Card withBorder p={0}>
                    {Component}
                </Card>
            </Stack>
        </Container>
    );
};

export default ManagerModule;