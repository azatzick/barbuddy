import { Stack, useSegments, useRouter, useRootNavigationState, Slot } from 'expo-router';
import React from 'react';
import {UserProvider} from '../contexts/UserContext'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutContent() {
  const {user, loading} = useUser();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  console.log(loading);

  useEffect(() => {
    if (!navigationState?.key || loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    //if we are at root, let app/index.tsx handle render
    if (segments.length === 0) {
      return
    };

    /* 
    condition: user is logged in, but is in (auth)
    action: route user to (tabs)
    */    
    if (user && inAuthGroup) {
      console.log('NAVIGATING TO TABS')
      router.replace('/(tabs)')
    }
    /*
    condition 2: user is NOT logged in, but is not in auth
    */
    else if(!user){
      if(!inAuthGroup){
        console.log('NAVIGATING TO LOGIN')
        router.replace('/(auth)/login')
      }
    }
  }, [user, loading, segments, navigationState]);

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
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name = "index" options={{ headerShown: false }}/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <UserProvider>
      <RootLayoutContent />
    </UserProvider>
  )
};