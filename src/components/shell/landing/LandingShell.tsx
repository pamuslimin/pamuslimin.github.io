import { ColorSchemeToggle } from "@/components/elements/color-scheme-switch/ColorSchemeSwitch";
import { HeaderResponsive } from "@/components/elements/header-responsive/HeaderResponsive";
import { AppShell, Button, Image, Paper, ScrollArea, Title, useMantineTheme } from "@mantine/core";
import { Outlet, useNavigate } from "@tanstack/react-location";
import { useCallback } from "react";

const LandingShell = () => {
  const theme = useMantineTheme();
  

  return (
    <AppShell header={<HeaderResponsive links={[
      { label: "Tentang Kami", link: "#about" },
      { label: "Donasi", link: "#donate" },
      { label: "Kontak", link: "#contacts" },
      { label: "Berita", link: "#news" }

    ]} />} padding={0} styles={{main: {
      padding: 0,
      margin: 0,
    }, root: {
      padding: 0,
      margin: 0,
    }}}
      fixed>
      <ScrollArea style={{ height: "calc(100vh - 60px)" }} p={0}>
        <Outlet />
      </ScrollArea>
    </AppShell>

  );
};

export default LandingShell;
