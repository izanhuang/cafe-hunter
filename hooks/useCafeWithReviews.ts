import { Cafe, Review } from "@/types";
import { useEffect, useState } from "react";

export function useCafeWithReviews(cafeId: string) {
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // const { data: cafeData, error: cafeError } = await supabase
      //   .from("cafes")
      //   .select("*")
      //   .eq("id", cafeId)
      //   .single();

      // const { data: reviewData, error: reviewError } = await supabase
      //   .from("reviews")
      //   .select("*")
      //   .eq("cafe_id", cafeId)
      //   .order("created_at", { ascending: false });

      // if (cafeError || reviewError) {
      //   console.error(cafeError || reviewError);
      // } else {
      //   setCafe(cafeData);
      //   setReviews(reviewData);
      // }
      setLoading(false);
    }

    if (cafeId) {
      fetchData();
    }
  }, [cafeId]);

  return { cafe, reviews, loading };
}
