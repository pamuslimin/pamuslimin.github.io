import { createStyles, Paper, Text, Title, Button, useMantineTheme } from "@mantine/core"
import styles from "./FeatureCard.module.scss"

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: "Open Sans, sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 26,
    lineHeight: "135%",
  },

  category: {
    color: theme.white,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}))

interface FeatureCardProps {
  image: string
  title: string
  category?: string
  content: string
  actionText?: string
  actionHandler?: Function
  subActionText?: string
  subActionHandler?: Function
  actionDisabled?: boolean
  subActionDisabled?: boolean
}

export function FeatureCard({
  image,
  title,
  category = "",
  content,
  actionText,
  actionHandler,
  subActionDisabled,
  subActionText,
  subActionHandler,
  actionDisabled,
}: FeatureCardProps) {
  const { classes } = useStyles()
  const theme = useMantineTheme()

  return (
    <Paper
      shadow='md'
      radius='md'
      sx={{
        backgroundImage: `url(${image})`,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      }}
      className={classes.card}
    >
      <div
        className={styles.headCover}
        style={{
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        }}
      >
        <Text className={classes.category} size='xs'>
          {category}
        </Text>
        <Title order={2} size={"h2"} className={classes.title}>
          {title}
        </Title>
        <p>{content}</p>
        <div className={styles.actions}>
          {subActionText && (
            <Button
              disabled={subActionDisabled}
              onClick={() => subActionHandler?.()}
              variant='outline'
              fullWidth
            >
              {subActionText}
            </Button>
          )}
          {actionText && (
            <Button disabled={actionDisabled} onClick={() => actionHandler?.()} fullWidth>
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </Paper>
  )
}
