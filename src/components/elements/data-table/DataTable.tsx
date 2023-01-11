import { Skeleton, Table } from "@mantine/core"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableState,
  Updater,
  useReactTable,
} from "@tanstack/react-table"
import clsx from "clsx"
import { useMemo } from "react"
import styles from "./DataTable.module.scss"
import { ReactComponent as ChevronUpDown } from "@/assets/icon-chevron-updown.svg"
import { CaretDown as ChevronDown, CaretUp as ChevronUp } from "phosphor-react"

type MetaData = {
  page?: number
  size?: number
  MaxPage?: number
  MaxData?: number
}

type DataTableProps<T = any> = {
  className?: string
  data: T[]
  meta?: MetaData
  loading?: boolean
  columns: ColumnDef<T>[]
  state: Partial<TableState>
  setState: (updater: Updater<TableState>) => void
}

export const DataTable = ({
  className,
  data,
  meta,
  loading,
  columns,
  state,
  setState,
  ...props
}: DataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      ...state,
    },
    pageCount: meta?.MaxPage ?? 1,
    enableSorting: true,
    enableColumnResizing: true,
    state,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    onStateChange: setState,
  })

  const renderImage = useMemo(() => getImageByFilter(table), [table])

  const component = useMemo(
    () => (
      <div className={clsx(styles.dataTable, className)} {...props}>
        <Table
          fontSize='xs'
          highlightOnHover={table.getRowModel().rows.length > 0}
          horizontalSpacing='sm'
          striped={table.getRowModel().rows.length > 0}
          verticalSpacing='sm'
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    colSpan={header.colSpan}
                    key={header.id}
                    style={{ position: "relative", width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={clsx(header.column.getCanSort() && "cursor-pointer select-none")}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                    {header.column.getCanSort() && (
                      <div className={clsx(styles.sorter)}>
                        {{
                          asc: <ChevronUp size={12} />,
                          desc: <ChevronDown size={12} />,
                        }[header.column.getIsSorted() as string] ?? <ChevronUpDown />}
                      </div>
                    )}
                    {header.column.getCanResize() && (
                      <div
                        className={clsx(
                          styles.resizer,
                          header.column.getIsResizing() && styles.isResizing,
                        )}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      ></div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {/* {
          (loading || (table.getRowModel().rows.length < table.getState().pagination.pageSize && table.getRowModel().rows.length !== 0))
          && [...new Array(table.getState().pagination.pageSize - table.getRowModel().rows.length)].map((_, i) => (
            <tr className={styles.emptyrow} key={`blank-${i}`}>
              {table.getAllColumns().map(column => (
                <td key={column.id} style={{ width: column.getSize(), height: "32px" }}>
                  {loading && <Skeleton />}
                </td>
              ))}
            </tr>
          ))
        } */}

            {!loading && data?.length === 0 && (
              <tr style={{ height: "500px" }}>
                <td colSpan={table.getAllColumns().length}>
                  <div style={{ display: "flex", placeContent: "center" }}>{renderImage}</div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    ),
    [className, props, table, loading, data?.length, renderImage],
  )
  return { table, component, pagination: table.getState().pagination }
}

export default DataTable

function getImageByFilter(table: any) {
  return table.getState().globalFilter !== "" ? "Data tidak ditemukan" : "Data Kosong"
}
