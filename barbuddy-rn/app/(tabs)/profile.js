import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../../styles/global'; // Adjust the path as needed


const ProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [homeBar, setHomeBar] = useState('');
    const [loading, setLoading] = useState(false);

    const updateProfile = async () => {
        setLoading(true);
        try {
            // Your logic to update the user's profile on your backend or in Firebase
            // For example, you might use the Firebase Admin SDK to update the user record
            // or make a fetch request to a REST API.

            Alert.alert("Success!", "Profile updated successfully.");
        } catch (error) {
            Alert.alert("Error", "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <ActivityIndicator
                size="large"
                animating={loading}
            />
            <Text style={styles.title}>User Profile Data</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Home Bar"
                value={homeBar}
                onChangeText={setHomeBar}
            />
            <View style={GlobalStyles.button}>
                <Button
                    title="Update Profile"
                    onPress={updateProfile}
                    disabled={loading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        width: '80%',
    },
    buttonContainer: {
        marginBottom: 25,
        width: '80%',
    },
});

export default ProfileScreen;