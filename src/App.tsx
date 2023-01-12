import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Outlet, Router } from "@tanstack/react-location";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthMiddleware from "./hooks/useAuth";
import { LocationInstance, Routes } from "./routes";
import { ModalsProvider } from "@mantine/modals";
import { queryClient } from "./queryClient";
import modals from "./components/modals";
import { AppContextProvider } from "./components/modules/app/manager/AppContext";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            primaryColor: "green",
            primaryShade: 6,
          }}
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
        >
          <NotificationsProvider containerWidth={600} limit={5} position='top-center'>
            <ModalsProvider modalProps={{ centered: true }} modals={modals}>
              <Router location={LocationInstance} routes={Routes}>
                <AuthMiddleware>
                  <AppContextProvider>
                    <Outlet />
                  </AppContextProvider>
                </AuthMiddleware>
              </Router>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export default App;
