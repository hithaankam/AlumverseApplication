import { StyleSheet, Platform } from 'react-native';
import Colors from '../constants/Colors';

export const AuthStyles = StyleSheet.create({
  // Shared styles
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.lightBackground, // Changed to lightBackground
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    tintColor: Colors.primary, // Changed to primary
  },
  cardContainer: {
    width: '100%',
    height: 500,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20, // Increased borderRadius
    padding: 30,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    elevation: 10,
    borderWidth: 1, // Added border
    borderColor: Colors.subtleBorder, // Added border color
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.05)', // Adjusted shadow
        }
      : {
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: 8 }, // Adjusted shadow
          shadowOpacity: 0.05, // Adjusted shadow
          shadowRadius: 15, // Adjusted shadow
        }),
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.grayText, // Changed to grayText
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.subtleBorder, // Changed to subtleBorder
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    color: Colors.gray600, // Input text color
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.subtleBorder, // Changed to subtleBorder
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  eyeIcon: {
    padding: 15,
  },
  errorText: {
    color: Colors.error, // Use the new error color
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },

  // Login specific styles
  loginCard: {
    justifyContent: 'center',
  },
  loginButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary, // Changed to primary
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  loginLinkText: {
    color: Colors.primary, // Changed to primary
    textAlign: 'center',
    fontWeight: '500',
  },

  // Signup specific styles
  signupCard: {
    justifyContent: 'center',
  },
  signupButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  signupSecondaryButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.white, // White background
    borderWidth: 1,
    borderColor: Colors.subtleBorder, // Changed to subtleBorder
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
  },
  signupPrimaryButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary, // Changed to primary
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  signupButtonText: {
    color: Colors.primary, // Changed to primary
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },

  // Common styles
  buttonText: {
    color: Colors.white, // White text for primary buttons
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black, // Changed to black
    marginBottom: 20,
    textAlign: 'center',
  },

});
