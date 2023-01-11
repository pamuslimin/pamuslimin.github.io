import { CellContext } from "@tanstack/react-table"

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}

export function getPageIndex<T = any>(ctx: CellContext<T, any>): any {
  return (
    (ctx.table.getState().pagination.pageIndex >= 0
      ? ctx.table.getState().pagination.pageIndex
      : 0) *
      ctx.table.getState().pagination.pageSize +
    ctx.row.index +
    1
  )
}
