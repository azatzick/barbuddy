import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

export default function AppIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BarBuddy</Text>
      <View style={styles.buttonContainer}>
        <Link href="/(auth)/signup" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign up for a new account</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login to an existing account</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Dark background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700', // Bolder font
    marginBottom: 40,
    color: '#FFD700', // Gold color
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#FFD700', // Gold color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#1E1E1E', // Dark text for contrast
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});