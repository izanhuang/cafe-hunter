import { CafeInfo } from "@/components/cafe/CafeInfo";
import { ReviewCard } from "@/components/cafe/ReviewCard";
import { db } from "@/lib/firebase-firestore";
import { Cafe, Review } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, YStack } from "tamagui";

export default function CafeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchCafeDetails = async () => {
      if (!id) return;

      try {
        // Fetch cafe details
        const cafeDocRef = doc(db, "cafes", id as string);
        const cafeDoc = await getDoc(cafeDocRef);
        if (cafeDoc.exists()) {
          setCafe({ id: cafeDoc.id, ...cafeDoc.data() } as Cafe);
        } else {
          console.warn("Cafe not found");
        }

        // Fetch reviews
        const reviewsCollectionRef = collection(
          db,
          "cafes",
          id as string,
          "reviews"
        );
        const reviewsSnapshot = await getDocs(reviewsCollectionRef);
        const reviewsData = reviewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching cafe details or reviews:", error);
      }
    };

    fetchCafeDetails();
  }, [id]);

  if (!cafe)
    return (
      <Text textAlign="center" padding="$4">
        Loading...
      </Text>
    );

  return (
    <ScrollView padding="$4" space="$4">
      <CafeInfo cafe={cafe} />

      <Button
        theme="active"
        onPress={() =>
          router.push({
            pathname: "/cafe/leave-review",
            params: { id: cafe.id },
          })
        }
      >
        Leave a Review
      </Button>

      <YStack space="$3">
        <Text fontSize="$6" fontWeight="700">
          Reviews
        </Text>
        {reviews.length === 0 ? (
          <Text color="$gray10">
            No reviews yet. Be the first to leave one!
          </Text>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </YStack>
    </ScrollView>
  );
}
