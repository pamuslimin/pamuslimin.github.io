import { createStyles, Title } from "@mantine/core"
import clsx from "clsx"
import { ReactNode } from "react"
import styles from "./HeaderModule.module.scss"

export const useStyles = createStyles((theme, _params) => {
  return {
    header: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
    },
  }
})

const HeaderModule = ({ title, rightElement }: { title: ReactNode; rightElement?: ReactNode }) => {
  const { classes } = useStyles()
  return (
    <div className={clsx(styles.header, classes.header)}>
      {title instanceof String ? <Title size='h4'>{title}</Title> : title}
      {rightElement}
    </div>
  )
}

export default HeaderModule
