import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, Redirect } from 'expo-router';
import React from 'react';
import { GlobalStyles } from '@/styles/global';
import { useUser } from '@/hooks/useUser';
export default function AppIndex() {
    const { user, loading } = useUser();
    // 1. Show spinner while Firebase loads
    if (loading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' }}>
            <ActivityIndicator size="large" color="#FFD700" />
        </View>
        );
    }

    // 2. If User exists, Go to Tabs
    if (user) {
        return <Redirect href="/(tabs)" />;
    }

    // 3. If No User, Go to Login
    return <Redirect href="/(auth)/login" />;
};