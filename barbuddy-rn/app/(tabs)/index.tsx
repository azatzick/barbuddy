// app/(tabs)/index.tsx
import {ImageBackground,View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { GlobalStyles } from '@/styles/global';
import { useFonts } from "expo-font";
// import { markNodeAsRemovable } from 'react-native-reanimated/lib/typescript/core';
import { NovaMono_400Regular } from '@expo-google-fonts/nova-mono';
import React from 'react';
import { Stack, useSegments, useRouter, useRootNavigationState, Slot } from 'expo-router';
//@ts-ignore
import BarMap from '../../components/BarMap';
import NavBar from '../../components/NavBar';

/* 
Home Screen contains default map view and links
to other screens (profile, saved locations, etc)
*/

export default function HomeScreen() {
  const router = useRouter();

  return (
  <View style={styles.container} >
    <BarMap>
      <NavBar/>
    </BarMap>
  </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    // alignItems: 'center',
    justifyContent:'center',
    padding:30,
  },
  text:{
    fontSize:15,
    fontWeight:'regular',
    fontFamily:'NovaMono_400Regular',
    color:'#8E4585'
  },
  iconText:{
    fontSize:15,
    fontWeight:'bold',
    fontFamily:'NovaMono_400Regular',
    color:'#000000',
  },
  icon:{
    width:50,
    height:50,
    justifyContent:'center',
  },
  profileButton:{
    alignItems:'center',
    // justifyContent:'center'
  },
  map:{
    width:'100%',
    height:'100%'  
  }
})