import { getFirebaseAuth } from "@/lib/firebase-auth";
import { signOut, User } from "firebase/auth";
import { Button, Text, YStack } from "tamagui";

export default function AccountScreen({ user }: { user: User }) {
  const handleLogout = async () => {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (err: any) {
      console.error("Logout error:", err);
    }
  };

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      gap="$3"
    >
      <Text fontSize="$8" fontWeight="800">
        Welcome
      </Text>
      <Text fontSize="$5">{user?.email}</Text>

      <Button onPress={handleLogout} theme="active">
        Log out
      </Button>
    </YStack>
  );
}
