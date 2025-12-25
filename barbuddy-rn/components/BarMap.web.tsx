import React from 'react';
import Expo from 'expo';
import { View, Text, StyleSheet } from 'react-native';
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import { barMapTheme } from './MapStyles';

export default function BarMap({children}: {children: React.ReactNode}) { 
    const env = process.env
    const apiKey = env.EXPO_PUBLIC_GOOGLE_MAPS_KEY
    console.log('apiKey',apiKey)
    const center = {
        lat: 40.7128, // Default location (e.g., NYC)
        lng: -74.0060
    };

    if (!apiKey) {
        return (
          <View style={styles.container}>
            <Text>Error: Google Maps API Key is missing.</Text>
          </View>
        );
    }


    return (
        <View style={styles.container}>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                mapContainerStyle={styles.containerStyle}
                center={center}
                zoom={10}
                options={{
                    styles:barMapTheme,
                    disableDefaultUI:true,
                    zoomControl:false
                }}
                ></GoogleMap>
            </LoadScript>
            <View style={styles.overlayContainer}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Remove justifyContent/alignItems from here if overlayContainer handles centering
    backgroundColor: '#f0f0f0', // Consider if this background is needed if the map fills the space
    // height: 300, // This fixed height might prevent the map from filling the screen. Consider removing or adjusting.
  },
  text: {
    color: '#8E4585',
    fontFamily: 'NovaMono_400Regular',
  },
  containerStyle:{
    width:'100%',
    height:'100%'
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',     // Center children horizontally
    paddingBottom: 40,       // Add padding from the bottom edge
    justifyContent:'flex-end'
  }
});

const mapStyles = StyleSheet.create({

})