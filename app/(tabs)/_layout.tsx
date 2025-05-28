import { supabase } from "@/lib/supabase";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "tamagui";

export default function TabsLayout() {
  console.log("TabsLayout component rendered");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (isLoggedIn === null) return <Text textAlign="center">Loading...</Text>;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen
        name="account"
        options={{ title: isLoggedIn ? "Account" : "Login" }}
      />
    </Tabs>
  );
}
