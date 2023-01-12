import { ColorSchemeToggle } from "@/components/elements/color-scheme-switch/ColorSchemeSwitch";
import { HeaderResponsive } from "@/components/elements/header-responsive/HeaderResponsive";
import { AppShell, Button, Image, Paper, ScrollArea, Title, useMantineTheme } from "@mantine/core";
import { Outlet, useNavigate } from "@tanstack/react-location";
import { useCallback } from "react";

const LandingShell = () => {
  const theme = useMantineTheme();


  return (
    <Outlet />

  );
};

export default LandingShell;
