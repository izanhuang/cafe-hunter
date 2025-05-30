import { Cafe } from "@/types";
import { useRouter } from "expo-router";
import { Card, Text, YStack } from "tamagui";

export function CafeCard({ cafe }: { cafe: Cafe }) {
  const router = useRouter();

  return (
    <Card
      key={cafe.id}
      elevate
      bordered
      pressStyle={{ scale: 0.98 }}
      onPress={() => router.push(`/cafe/${cafe.id}`)}
      padding="$4"
      marginBottom="$3"
    >
      <YStack gap="$2">
        <Text fontWeight="bold" fontSize="$6">
          {cafe.name}
        </Text>
        {cafe.address && <Text color="$gray10">{cafe.address}</Text>}
        {cafe.description && <Text>{cafe.description}</Text>}
      </YStack>
    </Card>
  );
}
