import { CafeInfo } from "@/components/CafeInfo";
import { ReviewCard } from "@/components/ReviewCard";
import { supabase } from "@/lib/supabase";
import { Cafe, Review } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, YStack } from "tamagui";

export default function CafeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchCafeData = async () => {
      const { data: cafeData } = await supabase
        .from("cafes")
        .select("*")
        .eq("id", id)
        .single();
      const { data: reviewData } = await supabase
        .from("reviews")
        .select("*")
        .eq("cafe_id", id)
        .order("created_at", { ascending: false });

      if (cafeData) setCafe(cafeData);
      if (reviewData) setReviews(reviewData);
    };

    fetchCafeData();
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
