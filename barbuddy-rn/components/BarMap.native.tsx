import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function BarMap() {
    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map}></MapView>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    map: {
        width: '100%',
        height: '100%'
    }
});