import { useAuth } from "@/context/auth-context";
import { Tabs } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) return <ActivityIndicator />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen
        name="account"
        options={{ title: user ? "Account" : "Login" }}
      />
    </Tabs>
  );
}
