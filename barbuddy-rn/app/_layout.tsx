import { Stack, useSegments, useRouter, useRootNavigationState, Slot } from 'expo-router';
import React from 'react';
import {UserProvider} from '../contexts/UserContext';
import { useUser } from '../hooks/useUser';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NovaMono_400Regular } from '@expo-google-fonts/nova-mono';
import { useFonts } from 'expo-font';
import { LifeLine } from 'react-loading-indicators';

function RootLayoutContent() {
  const {user, loading} = useUser();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  console.log(loading);

  const [fontsLoaded] = useFonts({
    NovaMono_400Regular
  })

  if(!fontsLoaded) {
    return <LifeLine color="#8E4585" size="medium" text="Loading..." textColor="8E4585" style = {styles.lifeline}/>; // Or any other loading indicator
  }

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