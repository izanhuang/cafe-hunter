import { Review } from "@/types";
import { Card, Text, XStack, YStack } from "tamagui";

type Props = {
  review: Review;
};

export function ReviewCard({ review }: Props) {
  return (
    <Card padding="$4" elevate bordered>
      <YStack space>
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="600">{review.user_name || "Anonymous"}</Text>
          <Text color="$yellow10">★ {review.rating}</Text>
        </XStack>
        {review.description && (
          <Text fontSize="$4" color="$gray10">
            {review.description}
          </Text>
        )}
      </YStack>
    </Card>
  );
}
