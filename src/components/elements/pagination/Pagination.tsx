import { PaginationProps, Pagination as BasePagination } from "@mantine/core"

import styles from "./Pagination.module.scss"

export const Pagination = (props: PaginationProps) => {
  return (
    <BasePagination
      classNames={{
        item: styles.item,
      }}
      {...props}
    />
  )
}

export default Pagination
