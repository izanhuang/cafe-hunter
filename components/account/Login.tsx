import { getFirebaseAuth } from "@/lib/firebase-auth";
import { db } from "@/lib/firebase-firestore";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Input, Text } from "tamagui";
import { useAuth } from "../../context/auth-context";
import SignUp from "./SignUp";

export default function AccountScreen() {
  const { loading: authLoading } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Login and SignUp
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(authLoading);
  }, [authLoading]);

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
    redirectUri: "http://localhost:8081",
  });

  useEffect(() => {
    console.log("Google Auth Response:", response);
    const authenticateWithGoogle = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;

        const auth = getFirebaseAuth();
        const credential = GoogleAuthProvider.credential(id_token);

        try {
          const userCredential = await signInWithCredential(auth, credential);
          const user = userCredential.user;

          // Create a Firestore document for the user if it doesn't exist
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, {
            email: user.email,
            name: user.displayName || "Anonymous",
            createdAt: new Date().toISOString(),
          });

          console.log(
            "✅ User signed in with Google and Firestore document created!"
          );
        } catch (error) {
          console.error("❌ Error signing in with Google:", error);
        }
      }
    };

    authenticateWithGoogle();
  }, [response]);

  if (isSignUp) {
    return <SignUp setIsSignUp={setIsSignUp} />; // Pass setIsSignUp to SignUp for toggling back
  }

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

      <Button theme="active" onPress={() => setIsSignUp(true)}>
        Sign Up with Email
      </Button>

      <Button theme="active" disabled={!request} onPress={() => promptAsync()}>
        {loading ? "Signing in with Google..." : "Sign in with Google"}
      </Button>
    </>
  );
}
