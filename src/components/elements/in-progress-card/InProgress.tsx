import { Center, Container, createStyles, Paper, Text, Title } from "@mantine/core"
import { Gear } from "phosphor-react"
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: `Lato, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))
function InProgressNotification() {
  const { classes } = useStyles()
  return (
    <Container className={classes.root}>
      <Paper p={"xl"} m={"xl"}>
        <Center>
          <Gear color='#1864ab' weight='duotone' size={64}>
            <animateTransform
              attributeName='transform'
              attributeType='XML'
              type='rotate'
              dur='5s'
              from='0 0 0'
              to='360 0 0'
              repeatCount='indefinite'
            ></animateTransform>
          </Gear>
        </Center>
        <Title className={classes.title}> Fitur sedang dibangun </Title>
        <Text color='dimmed' size='lg' align='center' className={classes.description}>
          Fitur ini sedang dalam tahap pengembangan, terima kasih atas dukungan anda.
        </Text>
      </Paper>
    </Container>
  )
}
export default InProgressNotification
