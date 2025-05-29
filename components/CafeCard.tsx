import { db } from "@/lib/firebase";
import { Cafe } from "@/types";
import { useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { Card, Text, YStack } from "tamagui";

export function CafeCard({ cafe }: { cafe: Cafe }) {
  const router = useRouter();

  useEffect(() => {
    const fetchCafeDetails = async () => {
      const cafesRef = collection(db, "cafes");
      const q = query(cafesRef, where("id", "==", cafe.id));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.warn("No cafe found with the given ID:", cafe.id);
        return;
      }
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
      });
      // const cafeData = querySnapshot.docs[0].data() as Cafe;
      // You can use cafeData to set state or do something else if needed
    };
    fetchCafeDetails();
  }, [cafe.id]);

  return (
    <Card
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
