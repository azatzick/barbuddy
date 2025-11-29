import React from 'react';
import Expo from 'expo';
import { View, Text, StyleSheet } from 'react-native';
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import { barMapTheme } from './MapStyles';

export default function BarMap() {
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

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    height: 300, // Give it a fixed height so it's visible
  },
  text: {
    color: '#8E4585',
    fontFamily: 'NovaMono_400Regular',
  },
  containerStyle:{
    width:'100%',
    height:'100%'
  }
});

const mapStyles = StyleSheet.create({

})