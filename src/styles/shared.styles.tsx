import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme, _params) => {
  return {
    header: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
    },
    cardLight: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
    },
  }
})
