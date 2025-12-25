/* 
Signup Screen Component
Allows new user to create an account which is securely stored in Firebase
Author: Wright Frost
8/22/2025
*/
import { useUser } from '../../hooks/useUser';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, ActivityIndicator, Pressable, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const SignupScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, message, loading, register,setMessage} = useUser(); //destructure props we need from useUser()
    const router = useRouter();

    // use useFocusEffect hook to clear any existing messages from the page if you leave it and come back
    useFocusEffect(
        React.useCallback(() => {
          // Clear the message state when the screen comes into focus
          setMessage('');
          // Clean up function to run when the screen loses focus
          return () => setMessage('');
        }, [setMessage]) // Added setMessage to dependency array for best practice
      );

    const handleSignup = async () => {
        try {
            await register(email, password)    
        }catch(error){
            setMessage(error.message)
        }
    };
    
    return (
    <LinearGradient colors={['#f5f5f5ff', '#8c84d1ff']} style={styles.container}>
      <View style={styles.card} opacity={loading ? 0.3 : 1}>
        {loading && <ActivityIndicator 
            size="large"
            animating = {loading}
            style={{ position: 'absolute', top: 10, zIndex: 1 }}
        />}
        <Text style={styles.title}>Create your BarBuddy account</Text>
        {message ? <Text style={styles.text}>{message}</Text> : null}
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#555"
            keyboardType = "email-address" 
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style = {styles.input}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#555"
            value = {password}
            onChangeText = {setPassword}>
        </TextInput>
        <TextInput
            style = {styles.input}
            placeholder="Full Name">
          </TextInput>
        <View style={{ marginBottom: 25 }}>
            <TouchableOpacity
                style = {styles.button}
                title="Sign Up"
                onPress={handleSignup}
            >
                <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        <Pressable style={({ pressed }) => [styles.link, pressed && { opacity: 0.5 }]} onPress={() => router.replace('/login')}>
            <Text style={styles.link}>Login to existing account</Text>
        </Pressable>
      </View>
    </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  link: {
    color: '#2E003E', // Deep Purple
    textDecorationLine: 'underline', // Underline to indicate it's a link
    fontSize: 16,
    fontWeight: '500',
    fontFamily:'NovaMono_400Regular',
    marginTop: 10,
    opacity: 0.8,
    },
  text: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 40,
    color: '#B00020', // Dark Red for error messages
    fontFamily:'NovaMono_400Regular',
    textAlign: 'center',
    },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily:'NovaMono_400Regular',
    marginBottom: 40,
    color: '#1A1A1A', // Near Black
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#2E003E',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: '80%',
    color: '#1A1A1A', // Dark text
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle transparent background
    borderStyle: 'solid', // Required for web borders to appear
    },
  button: {
    backgroundColor: '#2E003E', // Deep Purple
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    // --- Flexbox Centering (Crucial for TouchableOpacity) ---
    justifyContent: 'center',
    alignItems: 'center',
    },
    buttonText: {
    color: '#FFFFFF', // White text to contrast with Plum background
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'NovaMono_400Regular', 
  }
});

export default SignupScreen;