import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ReviewScreen() {
  const { cafeId } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text>Leaving a review for Cafe ID: {cafeId}</Text>
      {/* Form elements for rating, comments, etc. */}
    </View>
  );
}
