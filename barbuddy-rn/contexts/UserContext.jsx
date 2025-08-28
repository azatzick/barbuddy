import { createContext,useState } from "react";
import { signInWithEmailAndPassword , createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../services/firebase';

export const UserContext = createContext();

export function UserProvider({ children }) { //children prop represents child components Provider function will wrap
    const [user,setUser] = useState(null )
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');

    async function login(email, password) {
        setLoading(true)
        console.log('current user:',user)
        try {
            // 1. Use the Firebase Client SDK to create the user.
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const returnedUser = userCredential.user;
            if(returnedUser) {
                setUser(returnedUser);
                console.log('User logged in:', user.uid);
                setMessage('Successfully logged in')
                return { success: true, message};

            }
          } catch (error) {
                console.log(error.message)
                if (error.message.includes('invalid-credential')) {
                    setMessage('Username or password is incorrect')
                }
                else if (error.message.includes('auth/invalid-email')) {
                    setMessage('The email address you have entered is invalid. Please use a valid email.')
                }
                return {success: false, message};
          } finally {
            setLoading(false);
          }

    }

    async function register(email,password){
        setLoading(true)
        console.log('current user:',user)
        try {
            // 1. Use the Firebase Client SDK to create the user.
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const returnedUser = userCredential.user;
            if(returnedUser) {
                setUser(returnedUser);
                console.log('User logged in:', user.uid);
                setMessage('Account created successfully.')
                return { success: true, message};

            }
          } catch (error) {
                console.log(error.message)
                if (error.message.includes('auth/email-already-in-use')) {
                    setMessage('This email is already associated with an existing BarBuddy account')
                }
                else if (error.message.includes('auth/invalid-email')) {
                    setMessage('The email address you have entered is invalid. Please use a valid email.')
                }
                else if (error.message.includes('auth/weak-password')) {
                    setMessage('The password you have entered is too weak. Please enter a stronger password.')
                }
                return {success: false, message};
          } finally {
            setLoading(false);
          }
    }

    async function logout() {
        await account.deleteSession("current")
        setUser(null);
    }

    return (
        <UserContext value = {{user, loading, message, login, register, logout,setMessage}}>   
        {children}
        </UserContext>
    )
}