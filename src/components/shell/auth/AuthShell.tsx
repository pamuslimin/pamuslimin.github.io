import { Container, Image, Paper, Title, useMantineTheme } from "@mantine/core"
import { Outlet } from "@tanstack/react-location"
import styles from "./AuthShell.module.scss"
import loginImage from "@/assets/login.webp"

const AuthShell = () => {
  const theme = useMantineTheme()
  return (
    <Container size='sm'>
      <Title
        className={styles.title}
        variant='gradient'
        align='center'
        gradient={{ from: "green", to: "lime" }}
      >
        Panti Asuhan Muslimin Jaya
      </Title>
      <Paper
        className={styles.center}
        shadow='xs'
        radius='md'
        mt={250}
        p='xl'
        style={{
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        }}
      >
        <Outlet />
      </Paper>
    </Container>
  )
}

export default AuthShell
