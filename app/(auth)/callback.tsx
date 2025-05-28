import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Callback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const handleAuthRedirect = async () => {
    //   const { data, error } = await supabase.auth.getSession();

    //   if (error) {
    //     console.error("Failed to set session:", error);
    //   } else {
    //     if (window) {
    //       window.location.href = "/account";
    //     } else {
    //       router.replace("/account");
    //     }
    //   }
    // };

    // handleAuthRedirect();
    if (window) {
      window.location.href = "/account";
    } else {
      router.replace("/account");
    }
  }, []);

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
