import { getFirebaseAuth } from "@/lib/firebase-auth";
import { db } from "@/lib/firebase-firestore";
import { useLocalSearchParams } from "expo-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import {
  StarIcon as StarFilled,
  Star as StarOutline,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Button, Text, TextArea, XStack, YStack } from "tamagui";

export default function LeaveReviewScreen() {
  const { id: cafeId } = useLocalSearchParams<{ id: string }>();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const currentUser = auth.currentUser;
    setUserId(currentUser ? currentUser.uid : null);
  }, []);

  const isFormValid = rating > 0 && description.trim().length > 0;

  const handleSubmit = async () => {
    if (!cafeId || !userId) return;

    try {
      setSubmitting(true);

      const review = {
        cafeId,
        rating,
        comment: description.trim(),
        createdAt: Timestamp.now(),
        userId,
      };

      await addDoc(collection(db, "reviews"), review);

      // Reset form
      setDescription("");
      setRating(0);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = () =>
    [1, 2, 3, 4, 5].map((star) =>
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
    );

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
        {renderStars()}
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
        disabled={submitting || !isFormValid}
        theme={submitting ? "alt2" : "active"}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </YStack>
  );
}
