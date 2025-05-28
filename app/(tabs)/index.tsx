import { Text, YStack } from "tamagui";

export default function HomeScreen() {
  return (
    <YStack
      padding="$4"
      backgroundColor="$background"
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap="$3"
    >
      <Text fontSize="$8" color="$color" textAlign="center" fontWeight="700">
        Welcome to Cafe Hunter ☕
      </Text>
      <Text fontSize="$5" color="$color" textAlign="center">
        Find cozy local cafes around you!
      </Text>
    </YStack>
  );
}
