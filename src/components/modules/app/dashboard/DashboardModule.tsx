import { FeatureStats } from "@/components/elements/feature-stats/FeatureStats";
import { SimpleGrid, useMantineTheme } from "@mantine/core";
import { useMatch } from "@tanstack/react-location";
import { Calendar, ChatDots, Money, Users } from "phosphor-react";
import styles from "./Dashboard.module.scss";

const DashboardModule = () => {
  const theme = useMantineTheme();
  const {
    data: {
      orpCount, donCount, expCount, currCred, msgCount
    }
  } = useMatch();

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      }}
    >
      <div className={styles.hero}>
        <h1>Selamat Datang di Sistem Informasi Manajemen Panti Asuhan!</h1>
        <h2>Silakan pilih menu pada sidebar</h2>
      </div>
      <div className={styles.features}>
        <SimpleGrid cols={3}>
          <FeatureStats
            icon={<Money weight='fill' color={theme.colors.orange[5]} size={32} />}
            title='Kas Saat Ini'
            value={"Rp. " + currCred ?? 0}
          />
          <FeatureStats
            icon={<Money weight='fill' color={theme.colors.grape[5]} size={32} />}
            title='Donasi Masuk'
            value={"Rp. " + donCount ?? 0}
          />
          <FeatureStats
            icon={<Money weight='fill' color={theme.colors.orange[5]} size={32} />}
            title='Pengeluaran'
            value={"Rp. " + expCount ?? 0}
          />
          <FeatureStats
            icon={<Users weight='fill' color={theme.colors.blue[5]} size={32} />}
            title='Jumlah Anak Asuh'
            value={orpCount ?? 0}
          />
          <FeatureStats
            icon={<ChatDots weight='fill' color={theme.colors.green[5]} size={32} />}
            title='Jumlah Pesan Masuk'
            value={msgCount ?? 0}
          />
        </SimpleGrid>
      </div>
    </div>
  );
};
export default DashboardModule;
