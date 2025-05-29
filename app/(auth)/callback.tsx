import { useRouter } from "expo-router";
import { useState } from "react";

export default function Callback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-4">
      {loading ? (
        <p>Signing you in...</p>
      ) : (
        <p>Redirecting failed. Try logging in again.</p>
      )}
    </div>
  );
}
