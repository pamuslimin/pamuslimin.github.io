import useQuery from "@/hooks/useQuery";
import { supabase } from "@/supabaseClient";
import { objectToParameters, parametersToObject } from "@/utils/queryParams";
import { Breadcrumbs, Center } from "@mantine/core";
import { Navigate, ReactLocation, Route } from "@tanstack/react-location";
import { blogRoute } from "./blogRoute";
import { donationRoute } from "./donationRoute";
import { expensesRoute } from "./expensesRoute";
import { messagesRoute } from "./messagesRoute";
import { orphanRoute } from "./orphanRoute";

export const LocationInstance = new ReactLocation({
  parseSearch: parametersToObject,
  stringifySearch: objectToParameters,
});

export const Routes: Route[] = [
  {
    path: "/app",
    element: async () =>
      import("@/components/shell/main/MainShell").then(({ default: Component }) => <Component />),

    children: [
      {
        path: "/",
        element: async () =>
          import("@/components/modules/app/dashboard/DashboardModule").then(
            ({ default: Component }) => <Component />,
          ),
        loader: async () => {
          const { data: orpData, error: orpError } = await supabase.from("orphans").select("*");
          const { data: donData, error: donError } = await supabase.from("donations").select("amount, date").order("date", { ascending: false });

          return ({ orpCount: orpData?.length, donCount: donData?.reduce((a, b) => a + b.amount, 0)})

        },
      },
      orphanRoute,
      expensesRoute,
      donationRoute,
      blogRoute,
      messagesRoute,
      {
        path: "/settings",
        element: async () =>
          import("@/components/modules/app/settings/SettingsModule").then(
            ({ default: Component }) => <Component />,
          ),
        meta: { breadcrumb: () => <>Pengaturan</> },
      },
      {
        path: "/logout",
        element: <Navigate to='/auth/login' />,
      },
      {
        element: <Navigate to='/' />,
      },
    ],
  },
  {
    path: "/auth",
    element: async () =>
      import("@/components/shell/auth/AuthShell").then(({ default: Component }) => <Component />),
    children: [
      {
        path: "/login",
        element: async () =>
          import("@/components/modules/auth/login/LoginModule").then(({ default: Component }) => (
            <Component />
          )),
      },
      {
        path: "/register",
        element: async () =>
          import("@/components/modules/auth/register/RegisterModule").then(
            ({ default: Component }) => <Component />,
          ),
      },
    ],
  },
  {
    path: "/",
    element: async () =>
      import("@/components/shell/landing/LandingShell").then(({ default: Component }) => (
        <Component />
      )),
    children: [
      {
        path: "/:id",
        element: async () =>
          import("@/components/modules/landing/LandingModule").then(({ default: Component }) => (
            <Component />
          )),
        loader: async ({ params: { id } }) => {
          const { data, error } = await supabase.from("bank_accounts").select("banknumber, bankname, holdername");
          const {data: donors} = await supabase.from("donations").select("donorName, amount, date");
          return ({
            id,
            bankNumbers: data,
            donors,
          });
        }
      },
      {
        element: <Navigate to="/home"/>,
      }
    ],
  },

  {
    element: <Navigate to='/' />,
  },
];
