import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent:true,
        headerStyle: {
          backgroundColor: '#1E1E1E', // Dark background
        },
        headerShadowVisible: false, // applied here
        headerTintColor: '#FFD700', // Gold color for the back button and title
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="login" options={{ title: 'Log In'}}/>
      <Stack.Screen name="signup" options={{ title: 'Sign Up'}}/>
    </Stack>
  );
}