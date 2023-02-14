import { FeatureStats } from "@/components/elements/feature-stats/FeatureStats";
import MoneySpan from "@/components/elements/money-span/MoneySpan";
import { SimpleGrid, useMantineTheme } from "@mantine/core";
import { useMatch } from "@tanstack/react-location";
import { Calendar, ChatDots, Money, Users } from "phosphor-react";
import styles from "./Dashboard.module.scss";

const DonorDashboardModule = () => {
  const theme = useMantineTheme();
  const { data: { currCred } } = useMatch();
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      }}
    >
      <div className={styles.hero}>
        <h1>Selamat Datang Donatur yang budiman!</h1>
      </div>
      <div className={styles.features}>
        <SimpleGrid cols={3}>
          <FeatureStats
            icon={<Money weight='fill' color={theme.colors.orange[5]} size={32} />}
            title='Donasi anda sampai saat ini'
            value={<MoneySpan amount={currCred as number ?? 0} />}
          />
        </SimpleGrid>
      </div>
    </div>
  );
};
export default DonorDashboardModule;
