import { getFirebaseAuth } from "@/lib/firebase-auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Input, Text, YStack } from "tamagui";
import { useAuth } from "../../context/auth-context";

export default function AccountScreen() {
  const { user, loading: authLoading } = useAuth();
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

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider); // ❗ This will not work in Expo Go
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getFirebaseAuth();
      await signOut(auth);
    } catch (err: any) {
      console.error("Logout error:", err);
    }
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

        <Button
          theme="active"
          onPress={handleLogin}
          disabled={loading}
          width="100%"
        >
          {loading ? "Logging in..." : "Login with Email"}
        </Button>

        <Button onPress={handleSignup} width="100%">
          {loading ? "Signing up..." : "Sign Up with Email"}
        </Button>

        <Button onPress={handleGoogleLogin} width="100%" disabled={loading}>
          Continue with Google
        </Button>
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
