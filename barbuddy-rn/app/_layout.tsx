import { Stack } from 'expo-router';
import React from 'react';

// Change this to 'true' or 'false' to test.
const isAuthenticated = false;

export default function RootLayout() {
  return (
    <Stack>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}