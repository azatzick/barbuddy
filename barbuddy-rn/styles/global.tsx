import { StyleSheet, Platform } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Dark background
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
    }),
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 40,
    color: '#E0E0E0', // Slightly lighter gray for improved contrast
    textAlign: 'center',
  },
  link: {
    color: '#FFD700', // Gold color, to match the theme
    textDecorationLine: 'underline', // Underline to indicate it's a link
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.8,
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle transparent background
  },
  button: {
    backgroundColor: '#FFD700', // Gold color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    // Center the content inside the button
    justifyContent: 'center',
    alignItems: 'center',
    // Another cool feature: a soft shadow to make the button stand out
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      },
      android: {
        elevation: 10,
      },
      web: {
        // Use standard CSS boxShadow for the web platform
        boxShadow: '0 4px 6px rgba(255, 215, 0, 0.4)',
      },
    }),
  },
  buttonContainer: {
    width: '80%',
    // Center the button horizontally
    alignSelf: 'center',
    marginBottom: 25, // Add a margin at the bottom for spacing
  },
  buttonText: {
    // The button has a gold background, so black text provides the best contrast
    // and complements the dark background of the overall container.
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
