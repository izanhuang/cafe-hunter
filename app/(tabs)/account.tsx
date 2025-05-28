import { supabase } from "@/lib/supabase";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Button, Input, Text, YStack } from "tamagui";

WebBrowser.maybeCompleteAuthSession();

export default function AccountScreen() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      console.log("data.user", data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    setLoading(false);
  };

  // const redirectUri = AuthSession.makeRedirectUri({
  //   native: "true", // use native behavior for redirect URI
  // });

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // options: { redirectTo: redirectUri },
    });
    if (error) {
      setError(error.message);
    } else {
      setTimeout(() => {
        try {
          // router.replace("/(tabs)/account"); // or your home screen
        } catch (e) {
          console.error("Navigation error after login:", e);
        }
      }, 500); // Delay ensures router is hydrated
    }
  };

  // const handleAppleLogin = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "apple",
  //     options: { redirectTo: redirectUri },
  //   });
  //   if (error) setError(error.message);
  // };

  // useEffect(() => {
  //   const redirectUri = AuthSession.makeRedirectUri({
  //     scheme: "cafe-hunter",
  //   });

  //   console.log("Redirect URI:", redirectUri);
  // }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding="$4"
        gap="$3"
      >
        <Text fontSize="$8" fontWeight="800">
          Log in
        </Text>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          width="100%"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          width="100%"
        />

        {error ? (
          <Text color="red" fontSize="$4">
            {error}
          </Text>
        ) : null}

        <Button
          theme="active"
          onPress={handleLogin}
          disabled={loading}
          width="100%"
        >
          {loading ? "Logging in..." : "Login with Email"}
        </Button>

        <Button onPress={handleGoogleLogin} width="100%">
          Continue with Google
        </Button>
        {/* 
        <Button onPress={handleAppleLogin} width="100%">
          Continue with Apple
        </Button> */}
      </YStack>
    );
  }

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      gap="$3"
    >
      <Text fontSize="$8" fontWeight="800">
        Welcome
      </Text>
      <Text fontSize="$5">{user.email}</Text>

      <Button onPress={handleLogout} theme="active">
        Log out
      </Button>
    </YStack>
  );
}
