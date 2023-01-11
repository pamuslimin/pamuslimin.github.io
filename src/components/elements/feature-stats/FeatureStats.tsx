import { useMantineTheme } from "@mantine/core"
import React from "react"
import styles from "./feature-stats.module.scss"

export const FeatureStats = ({ icon, title, value }: any) => {
  const theme = useMantineTheme()
  return (
    <div
      className={styles.feature}
      style={{
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
      }}
    >
      <div
        className={styles.featureIcon}
        style={{
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
        }}
      >
        {icon}
      </div>
      <div className={styles.featureTitle}>{title}</div>
      <div className={styles.featureValue}>{value}</div>
    </div>
  )
}
