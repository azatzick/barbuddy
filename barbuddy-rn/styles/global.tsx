// styles/global.js
import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Dark background
    padding: 20,
  },
  text:{
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 40,
    color: '#F2F0EF', // White
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 40,
    color: '#FFD700', // Gold color
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: '80%',
    color: '#fff',
  },
  button: {
    backgroundColor: '#FFD700', // Gold color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
  },
  buttonText: {
    color: '#1E1E1E', // Dark text for contrast
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});