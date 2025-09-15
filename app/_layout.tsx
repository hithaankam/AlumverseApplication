import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { AuthContextProvider } from "../context/AuthContext"; // Import AuthContextProvider

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="home" />
          <Stack.Screen name="feed" />
          {/* Add other screens as needed */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50, // Use a neutral background color
  },
});