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
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';



const SigninScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { user, message, loading, login,setMessage} = useUser();
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
          // Clear the message state when the screen comes into focus
          setMessage('');
          // Clean up function to run when the screen loses focus
          return () => setMessage('');
        }, [setMessage]) // Added setMessage to dependency array for best practice
      );

        const handleSignin = async () => {
            // Call the login function from the context instead of handling auth directly.
            try{
                await login(email, password)
            } catch(error) {
                setMessage(error.message)
            }
        };
    
    return (
    <View style={GlobalStyles.container}>
        <ActivityIndicator 
            size="large"
            animating = {loading}
        />
        <Text style={GlobalStyles.title}>Log in to your BarBuddy account</Text>
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
                style = {GlobalStyles.button}
                title="Sign in"
                onPress={handleSignin}
            />
        </View>
        <Text style={GlobalStyles.text}>{message}</Text>
        <Pressable style={({ pressed }) => [GlobalStyles.link, pressed && { opacity: 0.5 }]} onPress={() => router.replace('/signup')}>
            <Text style={GlobalStyles.link}>Register for new account</Text>
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

export default SigninScreen;