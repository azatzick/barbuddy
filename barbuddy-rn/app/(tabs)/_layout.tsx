import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        headerStyle: {
          backgroundColor: '#1E1E1E', // Dark background
        },
        headerShadowVisible: false, // applied here
        headerTintColor: '#FFD700', // Gold color for the back button and title
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="profile" options={{title: "Profile", headerShown: false}}/>
    </Stack>
  );
}