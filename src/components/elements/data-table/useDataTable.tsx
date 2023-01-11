import { Pagination } from "@/components/elements/pagination/Pagination"
import { Divider, Group, Select, Text } from "@mantine/core"
import { ColumnDef, TableState, Updater } from "@tanstack/react-table"
import { CaretDown } from "phosphor-react"
import { useMemo } from "react"
import { DataTable } from "./DataTable"
import styles from "./DataTable.module.scss"

export type useDataTableProps<T> = {
  queryHook: any
  className?: string
  columns: ColumnDef<T>[]
  state: Partial<TableState>
  setState: (updater: Updater<TableState>) => void
  pageSizer?: boolean
}

export function useDataTable<T = any>({
  queryHook,
  columns,
  state,
  setState,
  pageSizer = true,
  className,
  ...rest
}: useDataTableProps<T>) {
  const data = queryHook

  const {
    table,
    component: tableComponent,
    pagination,
  } = DataTable({
    columns,
    data: data.data ?? [],
    meta: data.meta ?? [],
    loading: data.isFetching,
    state,
    setState,
    className,
  })

  const paginationPos = useMemo(
    () => pagination.pageIndex * pagination.pageSize,
    [pagination.pageIndex, pagination.pageSize],
  )

  const paginationComponent = (
    <Group spacing={24} mx={24} py={14}>
      <Text size={12} color='gray.5'>
        Menampilkan {paginationPos + 1}-{paginationPos + data?.data?.length} dari{" "}
        {data.meta?.totalData || 0} data
      </Text>
      {pageSizer && (
        <Group spacing={0}>
          <Text color='gray.5' size={12}>
            Tampilkan Data:
          </Text>

          <Select
            data={["10", "25", "50"].map((e: string) => ({ label: `${e} Data`, value: e }))}
            variant='unstyled'
            value={`${pagination.pageSize ?? 10}`}
            styles={(theme) => ({
              wrapper: {
                width: 84,
              },
              input: {
                color: theme.colors.gray[7],
                fontSize: 12,
                paddingLeft: 12,
              },
              dropdown: {
                borderRadius: 8,
              },
              item: {
                fontSize: 12,
                paddingLeft: 6,
              },
            })}
            onChange={(e) =>
              e &&
              setState((p) => ({
                ...p,
                pagination: { pageIndex: pagination.pageIndex, pageSize: +e },
              }))
            }
            rightSection={<CaretDown size={12} />}
          />
        </Group>
      )}
      <Pagination
        ml='auto'
        onChange={(e) => {
          const page = e ? Number(e) - 1 : 0
          setState((p) => ({
            ...p,
            pagination: { pageIndex: page, pageSize: pagination.pageSize },
          }))
        }}
        page={(pagination.pageIndex >= 0 ? pagination.pageIndex : 0) + 1}
        radius={8}
        siblings={1}
        total={data?.meta?.totalPage || 0}
        styles={(theme) => ({
          item: {
            fontSize: 14,
            minWidth: 24,
            gap: 0,
            "&[data-active]": {
              backgroundColor: "transparent",
              color: theme.colors.blue[6],
            },
          },
        })}
      />
    </Group>
  )

  return {
    states: state,
    Component: (
      <div className={styles.tableLayout}>
        {tableComponent}
        <Divider />
        {paginationComponent}
      </div>
    ),
  }
}
