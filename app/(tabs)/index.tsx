import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { TamaguiProvider, Text, View } from "tamagui";
import config from "../../tamagui.config";

export default function HomeScreen() {
  // inside your component
  useEffect(() => {
    supabase.from("test").select("*").then(console.log);
  }, []);

  return (
    <TamaguiProvider config={config}>
      <View
        padding="$4"
        backgroundColor="$background"
        flex={1}
        justifyContent="center"
      >
        <Text fontSize="$8" color="$color" textAlign="center">
          Welcome to Cafe Hunter ☕
        </Text>
        <Text fontSize="$5" color="$color" textAlign="center" marginTop="$2">
          Find cozy local cafes around you!
        </Text>
      </View>
    </TamaguiProvider>
  );
}
