import { AboutUs } from "@/components/elements/about/AboutUs";
import DonationBox from "@/components/elements/donation-box/DonationBox";
import { HeaderResponsive } from "@/components/elements/header-responsive/HeaderResponsive";
import { HeroAlt } from "@/components/elements/hero-alt/HeroAlt";
import { AppShell, Box, Button, Center, Footer, Grid, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { useMatch, useNavigate } from "@tanstack/react-location";
import { useCallback, useLayoutEffect } from "react";
import { ContactPage } from "./ContactPage";
import { NewsPage } from "./NewsPage";
import { Testimonials } from "./Testimonials";
const getPresetTop: Record<string, number> = {
  "home": 0,
  "about": 540,
  "donation": 1500,
  "contacts": 2600,
  "news": 3200,
};
const LandingModule = () => {
  const {
    data: {
      id
    }
  } = useMatch();
  const menus = [
    { id: 1, label: "Tentang Kami", link: "/about" },
    { id: 2, label: "Donasi", link: "/donation" },
    { id: 3, label: "Kontak", link: "/contacts" },
    { id: 4, label: "Berita", link: "/news" },
  ];

  useLayoutEffect(() => {
    const ids = id as string;
    const parent = document.getElementById("container-main");
    parent?.scrollTo({ behavior: "smooth", top: getPresetTop[ids] ?? getPresetTop["hero"] });

  }, [id]);

  const navigate = useNavigate();
  const handleLogin = useCallback(() => {
    navigate({ to: "/auth/login" });
  }, [navigate]);
  return (
    <AppShell header={<HeaderResponsive links={menus} />} padding={0} styles={{
      main: {
        padding: 0,
        margin: 0,
      }, root: {
        padding: 0,
        margin: 0,
      }
    }} footer={<Footer height={32}>
      <Center>
        <span>Copyright <Button p={0} variant="white" onClick={handleLogin}>&copy;</Button></span><span>{`${new Date().getFullYear()} - Tim Putaryu - Universitas Nusa Mandiri`}</span>
      </Center>
    </Footer>}
      fixed>
      <div id="container-main" style={{ height: "calc(100vh - 60px)", overflow: "scroll" }}  >
        <div className="section" id='hero'   >
          <HeroAlt onDonateClick={() => navigate({ to: "/donation" })} />
        </div>
        <div className="section" id='about'   >
          <AboutUs />
        </div>
        <div className="section" id='about'>
          <Testimonials />
        </div>
        <div className="section" id='donation'>
          <DonationBox />
        </div>
        <div className="section" id='contacts' style={{ marginTop: "5em", minHeight: 600 }}>
          <ContactPage />
        </div>
        <div className="section" id='news' style={{ marginTop: "5em", minHeight: 600 }}>
          <NewsPage />
        </div>

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
                  <UnstyledButton onClick={() => navigate({ to: "/home", replace: true })}>  <Text size="sm" color="white">Beranda</Text></UnstyledButton>
                  <UnstyledButton onClick={() => navigate({ to: "/about", replace: true })}>  <Text size="sm" color="white">Tentang Kami</Text></UnstyledButton>
                  <UnstyledButton onClick={() => navigate({ to: "/donation", replace: true })}>  <Text size="sm" color="white">Donasi</Text></UnstyledButton>
                  <UnstyledButton onClick={() => navigate({ to: "/contacts", replace: true })}>  <Text size="sm" color="white">Kontak</Text></UnstyledButton>
                  <UnstyledButton onClick={() => navigate({ to: "/news", replace: true })}>  <Text size="sm" color="white">Berita</Text></UnstyledButton>
                </Stack>
              </Grid.Col>
              <Grid.Col span={3}>
                <Stack justify="center">
                  <Title order={3} color="white">
                    Salurkan Donasi Terbaik Anda

                  </Title>
                  <Button variant="light" onClick={() => navigate({ to: "/donation", replace: true })}>Donasi</Button>
                </Stack></Grid.Col></Grid>
          </Box>

        </footer>
      </div>
    </AppShell>
  );
};

export default LandingModule;


