import { Stack } from 'expo-router';
import React from 'react';
import {UserProvider} from '../contexts/UserContext'

// Change this to 'true' or 'false' to test.
const isAuthenticated = false;

export default function RootLayout() {
  return (
    <UserProvider>
        <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E1E1E', // Dark background
          },
          headerTintColor: '#FFD700', // Gold color for the back button and title
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false, // applied here
          headerShown: false

        }}>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
      </Stack>
    </UserProvider>
  
  );
}