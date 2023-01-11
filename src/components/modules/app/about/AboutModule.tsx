import { Button, Container, createStyles, Group, List, Text, ThemeIcon, Title } from "@mantine/core"
import { Check } from "phosphor-react"

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 580,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}))

function AboutModule() {
  const { classes } = useStyles()
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title
              className={classes.title}
              variant='gradient'
              gradient={{ from: "green", to: "cyan" }}
            >
              PA Muslimin Jaya
            </Title>
            <Text color='dimmed' mt='md'>
              PA Muslimin Jaya is a tools for analyzing citizen economy data.
            </Text>

            <List
              mt={30}
              spacing='sm'
              size='sm'
              icon={
                <ThemeIcon size={20} radius='xl'>
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Product Manager</b> – Deden Ardiansyah
              </List.Item>
              <List.Item>
                <b>Lead Engineer</b> – Fahmi Noor Fiqri
              </List.Item>
              <List.Item>
                <b>Designer</b> – Naufal Hanif
              </List.Item>
              <List.Item>
                <b>Developers</b> – Galang Septiadi, Fahmi Rasyid
              </List.Item>
            </List>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AboutModule
