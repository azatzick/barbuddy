import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { Stack } from 'expo-router';
import { NovaMono_400Regular } from '@expo-google-fonts/nova-mono';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        headerStyle: {
          backgroundColor: 'lavender', // Dark background
        },
        headerShadowVisible: false, // applied here
        headerTintColor: '#000000', // Gold color for the back button and title
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily:'NovaMono_400Regular'
        },
      }}>
      <Stack.Screen name="index" options={{title: "Home", headerShown: false}}/>
      <Stack.Screen name="profile" 
      options={{title: "Profile", 
      headerShown: true,
      headerTitle: 'Profile',
      headerBackTitle: 'Back'
      }}/>
    </Stack>
  );
}