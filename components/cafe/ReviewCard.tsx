import { db } from "@/lib/firebase-firestore";
import { Review } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, YStack } from "tamagui";

export function ReviewCard({ review }: { review: Review }) {
  const [userName, setUserName] = useState<string | null>("Anonymous");

  useEffect(() => {
    const fetchUserName = async () => {
      if (!review.userId) return;

      try {
        const userDocRef = doc(db, "users", review.userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || userData.email || "Anonymous");
        }
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };

    fetchUserName();
  }, [review.userId]);

  return (
    <YStack
      padding="$3"
      borderWidth={1}
      borderColor="$gray5"
      borderRadius="$2"
      marginBottom="$3"
    >
      <Text fontWeight="bold" fontSize="$5">
        {userName}
      </Text>
      <Text color="$yellow10" fontSize="$4">
        Rating: {review.rating}/5
      </Text>
      <Text fontSize="$3" color="$gray10">
        {review.description || "No description provided."}
      </Text>
    </YStack>
  );
}
