import { Tabs } from "expo-router";
import { useState } from "react";
import { Text } from "tamagui";

export default function TabsLayout() {
  console.log("TabsLayout component rendered");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

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
