import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useUser } from '../../hooks/useUser';
import { GlobalStyles } from '../../styles/global';

const ProfileScreen = () => {
    const [username, setUsername] = useState('');
    const [homeBar, setHomeBar] = useState('');
    const [loading, setLoading] = useState(false);
    const { logout } = useUser();

    const updateProfile = async () => {
        setLoading(true);
        try {
            // Your logic to update the user's profile on your backend or in Firebase
            console.log("Profile updated successfully.");
        } catch (error) {
            console.error("Failed to update profile:", error);
            // Note: Use a custom modal to display this error to the user.
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try{
            await logout()
        } catch(error) {

        }
    };

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.title}>My Profile</Text>

            {loading && <ActivityIndicator size="large" color="#FFD700" />}

            <View style={GlobalStyles.buttonContainer}>
                <TouchableOpacity
                    style={GlobalStyles.button}
                    onPress={updateProfile}
                    disabled={loading}
                >
                    <Text style={GlobalStyles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={GlobalStyles.buttonContainer}>
                <TouchableOpacity
                    style={GlobalStyles.button}
                    onPress={handleLogout}
                    disabled={loading}
                >
                    <Text style={GlobalStyles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;
