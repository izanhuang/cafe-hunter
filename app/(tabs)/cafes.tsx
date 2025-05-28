import { CafeCard } from "@/components/CafeCard";
import { supabase } from "@/lib/supabase";
import { Cafe } from "@/types";
import { useEffect, useState } from "react";
import { ScrollView, Text, YStack } from "tamagui";

export default function CafesList() {
  const [cafes, setCafes] = useState<Cafe[]>([]);

  useEffect(() => {
    const fetchCafes = async () => {
      const { data, error } = await supabase.from("cafes").select("*");
      if (!error && data) setCafes(data);
    };

    fetchCafes();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <YStack space="$4">
        <Text fontSize="$8" fontWeight="800">
          Explore Cafes
        </Text>

        {cafes.length === 0 ? (
          <Text color="$gray10" fontSize="$5">
            No cafes available right now. Please check back later.
          </Text>
        ) : (
          cafes.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} />)
        )}
      </YStack>
    </ScrollView>
  );
}
