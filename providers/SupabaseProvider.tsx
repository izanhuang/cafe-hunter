import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // const init = async () => {
    //   const {
    //     data: { session },
    //   } = await supabase.auth.getSession();
    //   setSession(session);
    //   supabase.auth.onAuthStateChange((_event, session) => {
    //     setSession(session);
    //   });
    // };
    // init();
  }, []);

  return <>{children}</>;
};
