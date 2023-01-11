import { supabase } from "@/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "@tanstack/react-location";
import { useCallback, useEffect, useState } from "react";

const   AuthMiddleware = ({ children }: { children: React.ReactNode; }) => {
  const {
    current: { pathname },
  } = useLocation();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const navigate = useNavigate();

  const storageEventHandler = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (pathname.match("/auth/*") && token) {
      return navigate({ to: "/app/" });
    }
    if (!pathname.match("/auth/*") && !token) {
      return navigate({ to: "/" });
    }
  }, [pathname]);

  useEffect(() => {
    storageEventHandler();
    window.addEventListener("storage", storageEventHandler);
    return () => {
      window.removeEventListener("storage", storageEventHandler);
    };
  }, [pathname]);



  return <>{children}</>;
};

export default AuthMiddleware;
