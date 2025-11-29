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
    <View style={styles.container}>
        <ActivityIndicator 
            size="large"
            animating = {loading}
        />
        <Text style={styles.title}>Create your BarBuddy account</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType = "email-address" 
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style = {styles.input}
            secureTextEntry={true}
            placeholder="Password"
            value = {password}
            onChangeText = {setPassword}>
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
        <Text style={styles.text}>{message}</Text>
        <Pressable style={({ pressed }) => [styles.link, pressed && { opacity: 0.5 }]} onPress={() => router.replace('/login')}>
            <Text style={styles.link}>Login to existing account</Text>
        </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lavender', // lavender background
        padding: 20,
        // Use platform-specific shadows
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          },
          android: {
            elevation: 8,
          },
          web: {
            // Use standard CSS boxShadow for the web platform
            boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
          },
        })
    },
    link: {
        color: '#8E4585', // Plum color, to match the theme
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
        color: '#458E4E', // Slightly lighter gray for improved contrast
        fontFamily:'NovaMono_400Regular',
        textAlign: 'center',
      },
    title: {
        fontSize: 28,
        fontWeight: '700',
        fontFamily:'NovaMono_400Regular',
        marginBottom: 40,
        color: '#8E4585', // Plum color
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#8E4585',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        width: '80%',
        color: '8E4585',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle transparent background
      },
    button: {
        backgroundColor: '#8E4585', // Plum color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        // --- Flexbox Centering (Crucial for TouchableOpacity) ---
        justifyContent: 'center',
        alignItems: 'center',
      },
      // You MUST add this for TouchableOpacity, otherwise text is black and small
      buttonText: {
        color: '#FFFFFF', // White text to contrast with Plum background
        fontSize: 16,
        fontWeight: 'bold',
        // If you are using your custom font:
        fontFamily: 'NovaMono_400Regular', 
    }
});

export default SignupScreen;