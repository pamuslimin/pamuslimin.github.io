import { useDataTable, useDataTableProps } from '@/components/elements/data-table/useDataTable';
import SearchBar from '@/components/elements/search-bar/SearchBar';
import { Button, Card, Container, Group, Stack } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { useMatch } from '@tanstack/react-location';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'phosphor-react';
import React, { useState } from 'react';

type Props = {};

const ManagerModule = (props: Props) => {
    const { data: {
        entity,
        items,
        columns,
        editorModal,
        mutateAdd,
        mutateEdit,
        mutateDelete,
    } } = useMatch();
    const [state, setState] = useState({});
    const {
        Component
    } = useDataTable({
        queryHook: {
            data: items ?? [],
            meta: { page: 1, pageSize: 10, totalData: 0, totalPage: 1 },
        },
        state, setState,
        columns: columns as ColumnDef<any, unknown>[],
    } satisfies useDataTableProps<any>);
    return (
        <Container size="xl">
            <Stack>
                <Group position='apart' mt={16}>
                    <Button leftIcon={<Plus weight='bold' />} onClick={()=> openContextModal({
                        modal: editorModal as string,
                        title: `Tambah ${entity ?? "Entitas"}`,
                        innerProps: {
                            onClick: mutateAdd,
                            initialValue: {},
                        }
                    })}>{`Tambah ${entity ?? "Entitas"}`}</Button>
                    <SearchBar onClick={() => { }} />
                </Group>
                <Card withBorder p={0}>
                    {Component}
                </Card>
            </Stack>
        </Container>
    );
};

export default ManagerModule;