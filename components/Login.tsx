import { getFirebaseAuth } from "@/lib/firebase-auth";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Input, Text } from "tamagui";
import { useAuth } from "../context/auth-context";

export default function AccountScreen() {
  const { loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(authLoading);
  }, [authLoading]);

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const auth = getFirebaseAuth();
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleCloudConfig.clientId,
    // iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com", // Replace with your iOS Client ID
    // androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com", // Replace with your Android Client ID
    redirectUri: "http://localhost:8081",
  });

  useEffect(() => {
    console.log("Google Auth Response:", response);
    const authenticateWithGoogle = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;

        const auth = getFirebaseAuth(); // Make sure this uses the same instance
        const credential = GoogleAuthProvider.credential(id_token);

        try {
          await signInWithCredential(auth, credential);
          console.log("✅ User signed in with Google!");
        } catch (error) {
          console.error("❌ Error signing in with Google:", error);
        }
      }
    };

    authenticateWithGoogle();
  }, [response]);

  return (
    <>
      <Text fontSize="$8" fontWeight="800">
        Log in
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        width="100%"
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        width="100%"
      />

      {error && (
        <Text color="red" fontSize="$4">
          {error}
        </Text>
      )}

      <Button theme="active" onPress={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login with Email"}
      </Button>

      <Button theme="active" onPress={handleSignup}>
        {loading ? "Signing up..." : "Sign Up with Email"}
      </Button>

      <Button theme="active" disabled={!request} onPress={() => promptAsync()}>
        {loading ? "Signing in with Google..." : "Sign in with Google"}
      </Button>
    </>
  );
}
