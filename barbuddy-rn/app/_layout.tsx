import { Stack } from 'expo-router';
import React from 'react';

// Change this to 'true' or 'false' to test.
const isAuthenticated = false;

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E1E1E', // Dark background
        },
        headerTintColor: '#FFD700', // Gold color for the back button and title
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}