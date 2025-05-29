import { CafeCard } from "@/components/CafeCard";
import { db } from "@/lib/firebase";
import { Cafe } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, YStack } from "tamagui";

export default function CafesList() {
  const [cafes, setCafes] = useState<Cafe[]>([]);

  useEffect(() => {
    const fetchCafes = async () => {
      const querySnapshot = await getDocs(collection(db, "cafes"));
      setCafes(querySnapshot.docs.map((doc) => ({ ...(doc.data() as Cafe) })));
      return querySnapshot.docs.map((doc) => ({ ...(doc.data() as Cafe) }));
    };

    fetchCafes();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <YStack gap="$4">
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
