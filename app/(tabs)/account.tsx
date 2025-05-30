import Login from "@/components/Login";
import Profile from "@/components/Profile";
import { Text, YStack } from "tamagui";
import { useAuth } from "../../context/auth-context";

export default function AccountScreen() {
  const { user, loading } = useAuth();
  console.log("AccountScreen user:", user);

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      gap="$3"
    >
      {loading && <Text fontSize="$5">Loading...</Text>}
      {user ? <Profile user={user} /> : <Login />}
    </YStack>
  );
}
