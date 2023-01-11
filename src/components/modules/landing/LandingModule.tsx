import { AboutUs } from "@/components/elements/about/AboutUs";
import DonationBox from "@/components/elements/donation-box/DonationBox";
import { FeatureCard } from "@/components/elements/feature-card/FeatureCard";
import { HeroAlt } from "@/components/elements/hero-alt/HeroAlt";
import { Box, Button, Container, Grid, Group, Paper, SimpleGrid, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Check } from "phosphor-react";
import { ContactPage } from "./ContactPage";
import styles from "./Landing.module.scss";
import { NewsPage } from "./NewsPage";

const LandingModule = () => {
  const theme = useMantineTheme();
  return (<>
    <HeroAlt />

    <section id='about' >
      <AboutUs />
    </section>
    <section id='donasi' >
      <DonationBox />

    </section>
    <section id='kontak' style={{ marginTop: "5em" }} >
      <ContactPage />
    </section>
    <section id='berita' >
      <NewsPage />
    </section>

    <footer>
      <Box bg="green" h={266}>
        <Grid grow p={20}>
          <Grid.Col span={1} >
            <Stack  >
              <Title color="white" order={3}>Muslimin Jaya</Title>
              <Text color="white">Jl. Dr. Saharjo Jl. Sawo IV No.2, RT.3/RW.7, Manggarai Sel., Kec. Tebet, Jakarta, Daerah Khusus Ibukota Jakarta 12860
              </Text>
            </Stack></Grid.Col>
          <Grid.Col span="auto" >
            <Stack mr={32} spacing={4}>
              <Title mb={16} mt={4} color="white" order={4}>Menu</Title>
              <Text size="sm" color="white">Beranda</Text>
              <Text size="sm" color="white">Tentang Kami</Text>
              <Text size="sm" color="white">Donasi</Text>
              <Text size="sm" color="white">Kontak</Text>
              <Text size="sm" color="white">Berita</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={3}>
            <Stack justify="center">
              <Title order={3} color="white">
                Salurkan Donasi Terbaik Anda

              </Title>
              <Button variant="light">Donasi</Button>
            </Stack></Grid.Col></Grid>
      </Box>

    </footer>
  </>
  );
};

export default LandingModule;


