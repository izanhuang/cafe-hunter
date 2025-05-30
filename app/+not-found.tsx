import { Link, Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { Text, YStack } from "tamagui";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        padding="$4"
        gap="$4"
      >
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/" style={{ marginTop: 15, paddingVertical: 15 }}>
          <Text fontSize="$4" color="$blue10">
            Go to home screen!
          </Text>
        </Link>
      </YStack>
    </>
  );
}
