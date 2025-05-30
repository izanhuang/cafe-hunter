import { getFirebaseAuth } from "@/lib/firebase-auth";
import { db } from "@/lib/firebase-firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
  Button,
  Input,
  Label,
  ScrollView,
  Select,
  Text,
  XStack,
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [birthdayError, setBirthdayError] = useState(""); // State for birthday validation error

  // Validation function for birthday format
  const validateBirthday = (date: string) => {
    const regex = /^\d{4}\/\d{2}\/\d{2}$/; // Regex for YYYY/MM/DD format
    if (!regex.test(date)) {
      setBirthdayError("Birthday must be in YYYY/MM/DD format");
    } else {
      setBirthdayError("");
    }
    setBirthday(date);
  };

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      birthday.trim() !== "" &&
      birthdayError === "" && // Ensure birthday is valid
      email.trim() !== "" &&
      gender.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword
    );
  };

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
    } catch {
      setError("There was an error signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      width={"100%"}
    >
      <YStack
        space="$4"
        padding="$4"
        maxWidth={400}
        width={"100%"}
        alignSelf="center"
      >
        <Button theme="alt1" onPress={() => setIsSignUp(false)}>
          <Text>Back to Login</Text>
        </Button>
        <Text fontSize="$8" fontWeight="800" textAlign="center">
          Sign Up
        </Text>

        <YStack space="$3">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            width="100%"
          />
        </YStack>

        <YStack space="$3">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            width="100%"
          />
        </YStack>

        <YStack space="$3">
          <Label htmlFor="birthday">Birthday *</Label>
          <Input
            id="birthday"
            placeholder="YYYY/MM/DD"
            value={birthday}
            onChangeText={validateBirthday} // Validate birthday format
            width="100%"
          />
          <Text color="red" fontSize="$4" textAlign="center">
            {birthdayError}
          </Text>
        </YStack>

        <YStack space="$3">
          <Label htmlFor="email">Email *</Label>
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
          <Label htmlFor="gender">Gender *</Label>
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

        {/* Password Input with Toggle */}
        <YStack space="$3">
          <Label htmlFor="password">Password *</Label>
          <XStack
            alignItems="center"
            borderWidth={1}
            borderColor="$gray5"
            borderRadius="$2"
          >
            <Input
              id="password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible} // Toggle visibility
              flex={1}
              paddingRight="$4"
            />
            <Button
              onPress={() => setPasswordVisible(!passwordVisible)}
              theme="alt1"
              size="$2"
              circular
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </Button>
          </XStack>
        </YStack>

        {/* Confirm Password Input with Toggle */}
        <YStack space="$3">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <XStack
            alignItems="center"
            borderWidth={1}
            borderColor="$gray5"
            borderRadius="$2"
          >
            <Input
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible} // Toggle visibility
              flex={1}
              paddingRight="$4"
            />
            <Button
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              theme="alt1"
              size="$2"
              circular
            >
              {confirmPasswordVisible ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </Button>
          </XStack>
          {password !== confirmPassword && confirmPassword.trim() !== "" && (
            <Text color="red" fontSize="$4" textAlign="center">
              Passwords do not match
            </Text>
          )}
        </YStack>

        <Button
          theme={isFormValid() && !loading ? "active" : "disabled"}
          onPress={handleSignUp}
          disabled={!isFormValid() || loading}
          size="$4"
          marginTop="$4"
        >
          <Text theme={isFormValid() && !loading ? "active" : "disabled"}>
            {loading ? "Signing up..." : "Sign Up"}
          </Text>
        </Button>
        <Text color="red" fontSize="$4" textAlign="center">
          {error}
        </Text>
      </YStack>
    </ScrollView>
  );
}
