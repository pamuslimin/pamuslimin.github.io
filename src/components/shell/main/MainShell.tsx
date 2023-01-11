import HeaderAvatar from "@/components/elements/header-avatar/HeaderAvatar";
import {
  Anchor,
  AppShell,
  Breadcrumbs,
  Footer,
  Header,
  ScrollArea,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link, Outlet, useMatches, useNavigate } from "@tanstack/react-location";
import { CaretRight } from "phosphor-react";
import { useMemo } from "react";
import { Navbar } from "../../modules/main/navbar/NavbarModule";
import styles from "./MainShell.module.scss";

const MainShell = () => {
  const theme = useMantineTheme();
  const matches = useMatches();
  const navigate = useNavigate();
  const backLinks = useMemo(() => {
    return matches.filter((match) => match.route.meta?.backLink).length > 0;
  }, [matches]);

  const bread = useMemo(() => {
    return matches
      .filter((match) => match.route.meta?.breadcrumb)
      .map((match: any) => (
        <Link key={match.pathname} to={match.pathname}>
          <Text
            variant='text'
            style={{
              color: theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[7],
            }}
            size={20}
          >
            {match?.route?.meta?.breadcrumb(match.params)}
          </Text>
        </Link>
      ));
  }, [matches]);

  return (
    <AppShell
      padding={0}
      layout="alt"
      header={
        <Header height={60}>
          <div className={styles.header}>
            <Breadcrumbs
              separator={
                <CaretRight
                  size={20}
                  style={{
                    marginTop: 6,
                    color:
                      theme.colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[7],
                  }}
                />
              }
            >


              {bread}
            </Breadcrumbs>

            <HeaderAvatar />
          </div>
        </Header>
      }
      navbar={<Navbar />}
      style={{
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
      }}
    >
      <ScrollArea style={{ height: "calc(100vh - var(--mantine-header-height))" }}>
        <Outlet />
      </ScrollArea>
    </AppShell>
  );
};

export default MainShell;
