import { getFirebaseAuth } from "@/lib/firebase-auth";
import { db } from "@/lib/firebase-firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Button,
  Input,
  Label,
  ScrollView,
  Select,
  Text,
  YStack,
} from "tamagui";

export default function SignUp({
  setIsSignUp,
}: {
  setIsSignUp: (value: boolean) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    try {
      const auth = getFirebaseAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Create a Firestore document for the user
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        firstName,
        lastName,
        birthday,
        email: user.email,
        gender,
        createdAt: new Date().toISOString(),
      });

      console.log("✅ User signed up and Firestore document created!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <YStack space="$4" padding="$4" maxWidth={400} alignSelf="center">
        <Button theme="alt1" onPress={() => setIsSignUp(false)}>
          Back to Login
        </Button>
        <Text fontSize="$8" fontWeight="800" textAlign="center">
          Sign Up
        </Text>

        <YStack space="$3">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            width="100%"
          />
        </YStack>

        <YStack space="$3">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            width="100%"
          />
        </YStack>

        <YStack space="$3">
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            id="birthday"
            placeholder="YYYY-MM-DD"
            value={birthday}
            onChangeText={setBirthday}
            width="100%"
          />
        </YStack>

        <YStack space="$3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            width="100%"
            autoCapitalize="none"
          />
        </YStack>

        <YStack space="$3">
          <Label htmlFor="gender">Gender</Label>
          <Select id="gender" value={gender} onValueChange={setGender}>
            <Select.Trigger
              width="100%"
              borderWidth={1}
              borderColor="$gray5"
              borderRadius="$2"
            >
              <Select.Value placeholder="Select Gender" />
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Item value="male" index={0}>
                  <Select.ItemText>Male</Select.ItemText>
                </Select.Item>
                <Select.Item value="female" index={1}>
                  <Select.ItemText>Female</Select.ItemText>
                </Select.Item>
                <Select.Item value="other" index={2}>
                  <Select.ItemText>Other</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </YStack>

        <YStack space="$3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            width="100%"
          />
        </YStack>

        {error && (
          <Text color="red" fontSize="$4" textAlign="center">
            {error}
          </Text>
        )}

        <Button
          theme="active"
          onPress={handleSignUp}
          disabled={loading}
          size="$4"
          marginTop="$4"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </YStack>
    </ScrollView>
  );
}
