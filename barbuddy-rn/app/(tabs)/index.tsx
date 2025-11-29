// app/(tabs)/index.tsx
import {ImageBackground,View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { GlobalStyles } from '@/styles/global';
import { useFonts } from "expo-font";
import { markNodeAsRemovable } from 'react-native-reanimated/lib/typescript/core';
import { NovaMono_400Regular } from '@expo-google-fonts/nova-mono';
import {LifeLine} from 'react-loading-indicators';


export default function HomeScreen() {

  return (
  <View style={styles.container}>
    <Text style={styles.header}>Welcome to BarBuddy</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'lavender',
    alignItems: 'center',
    // justifyContent:'center',
    padding:30
  },
  header:{
    fontSize: 25,
    fontWeight:'bold',
    fontFamily: 'NovaMono_400Regular',
    color:'#8E4585'
  },
  lifeline:{
    alignItems:'center',
    justifyContent:'center'
  }
})