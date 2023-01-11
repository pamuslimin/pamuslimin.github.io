import { createStyles, Card, Group, Switch, Text } from "@mantine/core"
import clsx from "clsx"
import { ReactNode } from "react"

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
    paddingBottom: theme.spacing.sm,
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },

  title: {
    lineHeight: 1,
  },
}))

interface SwitchesCardProps {
  className?: string
  title: string
  description: string
  data: {
    title: string
    description: string
    switch?: ReactNode
  }[]
}

export function SwitchesCard({ className, title, description, data }: SwitchesCardProps) {
  const { classes } = useStyles()

  const items = data.map((item) => (
    <Group key={item.title} position='apart' className={classes.item} noWrap spacing='xl'>
      <div>
        <Text>{item.title}</Text>
        <Text size='xs' color='dimmed'>
          {item.description}
        </Text>
      </div>
      {item.switch || <Switch onLabel='ON' offLabel='OFF' className={classes.switch} size='lg' />}
    </Group>
  ))

  return (
    <Card withBorder radius='md' p='xl' className={clsx(classes.card, className)}>
      <Text size='lg' className={classes.title} weight={500}>
        {title}
      </Text>
      <Text size='xs' color='dimmed' mt={3} mb='xl'>
        {description}
      </Text>
      {items}
    </Card>
  )
}
