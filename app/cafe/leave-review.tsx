import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import {
  StarIcon as StarFilled,
  Star as StarOutline,
} from "lucide-react-native";
import { useState } from "react";
import { Button, Text, TextArea, XStack, YStack } from "tamagui";

export default function LeaveReviewScreen() {
  const { id } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert([
      {
        cafe_id: id,
        rating,
        description,
      },
    ]);
    setSubmitting(false);
    if (error) {
      alert(error.message);
    } else {
      alert("Review submitted!");
    }
  };

  return (
    <YStack
      flex={1}
      padding="$4"
      gap="$4"
      animation="quick"
      enterStyle={{ opacity: 0, y: 10 }}
      exitStyle={{ opacity: 0, y: -10 }}
    >
      <Text fontSize="$6" fontWeight="600">
        Leave a Review
      </Text>

      <XStack space="$2" alignItems="center">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rating ? (
            <StarFilled
              key={star}
              size={28}
              color="#FFD700"
              onPress={() => setRating(star)}
            />
          ) : (
            <StarOutline
              key={star}
              size={28}
              color="#999"
              onPress={() => setRating(star)}
            />
          )
        )}
      </XStack>

      <TextArea
        value={description}
        onChangeText={setDescription}
        placeholder="Write your thoughts here..."
        size="$4"
        minHeight={100}
      />

      <Button
        onPress={handleSubmit}
        disabled={submitting || rating === 0 || description.length === 0}
        theme={submitting ? "alt2" : "active"}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </YStack>
  );
}
