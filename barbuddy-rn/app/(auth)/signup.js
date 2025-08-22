/* 
Signup Screen Component
Allows new user to create an account which is securely stored in Firebase
Author: Wright Frost
8/22/2025
*/
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { GlobalStyles } from '../../styles/global'; // Adjust the path as needed

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSignup = async () => {
        setLoading(true);
        try {
            // 1. Use the Firebase Client SDK to create the user.
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if(user) {
                Alert.alert("Success!", "Account created successfully.");
                console.log('User created:', user.uid);
                setMessage('User successfully created')
            }
          } catch (error) {
                Alert.alert("Signup Error", error.message);
                console.log(error.message)
                if (error.message.includes('auth/email-already-in-use')) {
                    setMessage('This email is already associated with an existing BarBuddy account')
                }
                else if (error.message.includes('auth/invalid-email')) {
                    console.log('That email address is invalid!')
                };
          } finally {
            setLoading(false);
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