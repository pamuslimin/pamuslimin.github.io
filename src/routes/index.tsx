import { supabase } from "@/supabaseClient";
import { objectToParameters, parametersToObject } from "@/utils/queryParams";
import { createHashHistory, Navigate, ReactLocation, Route } from "@tanstack/react-location";
import { blogRoute } from "./blogRoute";
import { donationRoute } from "./donationRoute";
import { expensesRoute } from "./expensesRoute";
import { managementRoute } from "./managementRoute";
import { messagesRoute } from "./messagesRoute";
import { orphanRoute } from "./orphanRoute";
import { pendingDonationRoute } from "./pendingDonationRoute";

// Create a hash history
const hashHistory = createHashHistory();


export const LocationInstance = new ReactLocation({
  parseSearch: parametersToObject,
  stringifySearch: objectToParameters,

  history: hashHistory,
});

export const Routes: Route[] = [
  {
    children: [
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
          import("@/components/modules/landing/LandingModule").then(({ default: Component }) => (
            <Component />
          )),
        loader: async () => {
          const { data, error } = await supabase.from("bank_accounts").select("banknumber, bankname, holdername");
          const { data: donors } = await supabase.from("donations").select("donorName, amount, date").range(0, 9).order('date', { ascending: false });
          return ({
            id: "home",
            bankNumbers: data,
            donors,
          });
        }
      },
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
              const { data: orpData, error: orpError } = await supabase.from("orphans").select("id");
              const { data: donData, error: donError } = await supabase.from("donations").select("amount, date").order("date", { ascending: false });
              const { data: expData, error: expError } = await supabase.from("expenses").select("amount, date").order("date", { ascending: false });
              const { count } = await supabase.from("messages").select("id", { count: "estimated" });

              const donCount = donData?.reduce((a, b) => a + b.amount, 0) || 0;
              const expCount = expData?.reduce((a, b) => a + b.amount, 0) || 0;
              return ({ orpCount: orpData?.length, donCount: donCount, expCount: expCount, currCred: donCount - expCount, msgCount: count });

            },
          },
          orphanRoute,
          managementRoute,
          expensesRoute,
          donationRoute,
          pendingDonationRoute,
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
            element: <Navigate to='/home' />,
          },
          // {
          //   element: <Navigate to='/' />,
          // },
        ],
      },
      {
        path: "/:id",
        element: async () =>
          import("@/components/modules/landing/LandingModule").then(({ default: Component }) => (
            <Component />
          )),
        loader: async ({ params: { id } }) => {
          const { data, error } = await supabase.from("bank_accounts").select("banknumber, bankname, holdername");
          const { data: donors } = await supabase.from("donations").select("donorName, amount, date").range(0, 9).order('date', { ascending: false });
          return ({
            id,
            bankNumbers: data,
            donors,
          });
        }
      },
      {
        element: <Navigate to={"/"} />
      }

    ],
  },



];
