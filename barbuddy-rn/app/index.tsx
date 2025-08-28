import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import { GlobalStyles } from '@/styles/global';
export default function AppIndex() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Welcome to BarBuddy</Text>
      <View style={GlobalStyles.buttonContainer}>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity style={GlobalStyles.button}>
            <Text style={GlobalStyles.buttonText}>Sign up for a new account</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={GlobalStyles.button}>
            <Text style={GlobalStyles.buttonText}>Login to an existing account</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};