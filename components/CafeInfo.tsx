import { Cafe } from "@/types";
import { Card, Text, YStack } from "tamagui";

type Props = {
  cafe: Cafe;
};

export function CafeInfo({ cafe }: Props) {
  return (
    <Card padding="$4" elevate bordered>
      <YStack space>
        <Text fontSize="$8" fontWeight="700">
          {cafe.name}
        </Text>
        <Text fontSize="$5" color="$gray10">
          {cafe.address}
        </Text>
        {cafe.description && (
          <Text fontSize="$4" color="$gray10" fontStyle="italic">
            {cafe.description}
          </Text>
        )}
      </YStack>
    </Card>
  );
}
