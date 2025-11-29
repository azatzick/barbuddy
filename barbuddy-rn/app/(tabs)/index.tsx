// app/(tabs)/index.tsx
import {ImageBackground,View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { GlobalStyles } from '@/styles/global';
import { useFonts } from "expo-font";
import { markNodeAsRemovable } from 'react-native-reanimated/lib/typescript/core';
import { NovaMono_400Regular } from '@expo-google-fonts/nova-mono';
import {LifeLine} from 'react-loading-indicators';
import React from 'react';
import { Stack, useSegments, useRouter, useRootNavigationState, Slot } from 'expo-router';
import BarMap from '@/components/BarMap';

/* 
Home Screen contains default map view and links
to other screens (profile, saved locations, etc)
*/

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/profile')
  };

  return (
  <View style={styles.container}>
      <View style={styles.topBar}>
      <Text style={styles.header}>Welcome to BarBuddy</Text>
      <TouchableOpacity onPress={handlePress} style={styles.profileButton}>
      <Text style ={styles.iconText}>Profile</Text>
      <Image source = {require('../../assets/images/beer-svg.png')} style = {styles.icon}/>
      </TouchableOpacity>
    </View>
    <BarMap/>
  </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'lavender',
    // alignItems: 'center',
    // justifyContent:'center',
    padding:30,
  },
  topBar:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20,
    height:80
  },
  header:{
    fontSize: 25,
    fontWeight:'bold',
    fontFamily: 'NovaMono_400Regular',
    color:'#8E4585'
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
  lifeline:{
    alignItems:'center',
    justifyContent:'center',

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