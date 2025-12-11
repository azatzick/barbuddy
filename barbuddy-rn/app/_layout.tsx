import { Stack, useSegments, useRouter, useRootNavigationState, Slot } from 'expo-router';
import React from 'react';
import {UserProvider} from '../contexts/UserContext';
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NovaMono_400Regular } from '@expo-google-fonts/nova-mono';
import { useFonts } from 'expo-font';

function RootLayoutContent() {
  const {user, loading} = useUser();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  console.log(loading);

  const [fontsLoaded] = useFonts({
    NovaMono_400Regular
  })

  useEffect(() => {
    if (!navigationState?.key || loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    /*if we are at root, let app/index.tsx handle render
    Block error because app expects segments will always have 1 or 2 values
    @ts-expect-error */ 
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

  if(!fontsLoaded) {
    return (
    <View style = {styles.container}>
      <ActivityIndicator size="large" color="#8E4585" />
    </View>);
  }


  return (
    <Stack>
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

const styles = StyleSheet.create({
  container:{
    backgroundColor:'32cd32',
    alignItems: 'center',
    justifyContent:'center',
    padding:30
  },
  novaMono:{
    fontSize: 20,
    fontFamily: 'NovaMono_400Regular'
  },
  lifeline:{
    alignItems:'center',
    justifyContent:'center',
    fontFamily: 'NovaMono_400Regular'
  }
})