import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { barMapTheme } from './MapStyles';


export default function BarMap({children}: {children: React.ReactNode}) {
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={barMapTheme}
            />
            {/* Render children as an overlay */}
            <View style={styles.overlayContainer}>
                {children}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        // Remove alignItems/justifyContent from here if children are absolutely positioned
        // The map will fill the container, and the overlayContainer will handle its own children's positioning.
    },
    map: {
        width: '100%', // Changed to 100% to fit the container
        height: '100%' // Changed to 100% to fit the container
    },
    overlayContainer: {
        position: 'absolute', // Make it an overlay
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, // Cover the entire parent
        justifyContent: 'flex-end', // Center children vertically
        alignItems: 'center',
        paddingBottom: 40, // Add padding from the bottom edge
    }
});