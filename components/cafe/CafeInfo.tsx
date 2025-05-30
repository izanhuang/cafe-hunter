import { Cafe } from "@/types";
import { Linking } from "react-native";
import { Button, Card, Text, YStack } from "tamagui";

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
        <Text fontSize="$5" fontWeight="600">
          {cafe.description || "No description available."}
        </Text>
        {cafe.phoneNumber && (
          <Text color="$gray10" fontSize="$4">
            Phone: {cafe.phoneNumber}
          </Text>
        )}
        {cafe.websiteUrl && (
          <Text color="$blue10" fontSize="$4">
            Website:{" "}
            <Button
              href={cafe.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="$blue10"
              fontWeight="500"
              onPress={(e) => {
                e.preventDefault();
                if (cafe.websiteUrl) {
                  Linking.openURL(cafe.websiteUrl);
                }
              }}
            >
              Website
            </Button>
          </Text>
        )}
        {/* {cafe.hours && (
            <Text color="$gray10" fontSize="$4">
              Hours: {cafe.hours}
            </Text>
          )} */}
      </YStack>
    </Card>
  );
}
