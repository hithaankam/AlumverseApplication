// app/oauth2/callback.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  searchParams: { token?: string }; // token comes from URL
}

export default function OAuthCallback({ searchParams }: Props) {
  const router = useRouter();

  useEffect(() => {
    const saveTokenAndRedirect = async () => {
      try {
        if (!searchParams || !searchParams.token) {
          router.replace("/home");
          console.error("No token found in searchParams!", searchParams);
          return;
        }

        const token = searchParams.token;
        console.log("JWT token:", token);

        await AsyncStorage.setItem("accessToken", token);

        router.replace("/home");
      } catch (error) {
        console.error("Failed to save token:", error);
      }
    };

    saveTokenAndRedirect();
  }, [searchParams, router]);

  return null;
}
