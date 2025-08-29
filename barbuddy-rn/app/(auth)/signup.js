/* 
Signup Screen Component
Allows new user to create an account which is securely stored in Firebase
Author: Wright Frost
8/22/2025
*/
import { useUser } from '../../hooks/useUser';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Pressable } from 'react-native';
import { GlobalStyles } from '../../styles/global'; // Adjust the path as needed
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
        const result = await register(email, password);
        if (result.success) {
            console.log(result.message)
            // Alert.alert("Success!", result.message);
        } else {
            // Alert.alert("Login Error", result.message);
        }
        };
    
    return (
    <View style={GlobalStyles.container}>
        <ActivityIndicator 
            size="large"
            animating = {loading}
        />
        <Text style={GlobalStyles.title}>Create your BarBuddy account</Text>
        <TextInput
            style={GlobalStyles.input}
            placeholder="Email"
            keyboardType = "email-address" 
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style = {GlobalStyles.input}
            secureTextEntry={true}
            placeholder="Password"
            value = {password}
            onChangeText = {setPassword}>
        </TextInput>
        <View style={{ marginBottom: 25 }}>
            <Button
                title="Sign Up"
                onPress={handleSignup}
            />
        </View>
        <Text style={GlobalStyles.text}>{message}</Text>
        <Pressable onPress={() => router.replace('/login')}>
            <Text style={GlobalStyles.link}>Login to existing account</Text>
        </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom:20,
        textAlign:'center'
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
      },
    button:{
        marginBottom:20,
    }
});

export default SignupScreen;