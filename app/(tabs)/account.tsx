import * as WebBrowser from "expo-web-browser";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { Button, Input, Text, YStack } from "tamagui";
import { auth } from "../../lib/firebase";

WebBrowser.maybeCompleteAuthSession();

export default function AccountScreen() {
  console.log("AccountScreen component rendered");
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Logged in
    } else {
      // Logged out
    }
  });

  const signup = (email: string, password: string) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password);
    setError("");
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setError("");
    setLoading(false);
  };

  const handleGoogleLogin = async () => {};

  const handleLogout = async () => {
    signOut(auth);
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
