import { db } from "@/lib/firebase-firestore";
import { Cafe } from "@/types";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { Card, Text, YStack } from "tamagui";

export function CafeCard({ cafe }: { cafe: Cafe }) {
  const router = useRouter();

  useEffect(() => {
    const fetchCafeReviews = async () => {
      try {
        const reviewsCollectionRef = collection(
          db,
          "cafes",
          cafe.id,
          "reviews"
        );
        const reviewsSnapshot = await getDocs(reviewsCollectionRef);
        if (reviewsSnapshot.empty) {
          console.warn("No reviews found for the cafe with ID:", cafe.id);
          return;
        }
        const reviews = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Cafe reviews:", reviews);
      } catch (error) {
        console.error("Error fetching cafe reviews:", error);
      }
    };

    fetchCafeReviews();
  }, [cafe.id]);

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
        {cafe.description && <Text fontSize="$2">{cafe.description}</Text>}
      </YStack>
    </Card>
  );
}
