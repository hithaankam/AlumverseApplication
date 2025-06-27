import { StyleSheet, Platform } from 'react-native';
import Colors from '../constants/Colors';

export const AuthStyles = StyleSheet.create({
  // Shared styles
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.PRIMARY,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  cardContainer: {
    width: '100%',
    height: 500,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.WHITE,
    borderRadius: 24,
    padding: 30,
    position: 'absolute',
    backfaceVisibility: 'hidden',
    elevation: 10,
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        }
      : {
          shadowColor: Colors.BLACK,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
        }),
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.GRAY_DARK,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
  },
  eyeIcon: {
    padding: 15,
  },
  errorText: {
    color: '#ff4444',
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
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  loginLinkText: {
    color: Colors.PRIMARY,
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
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
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
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  signupButtonText: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },

  // Common styles
  buttonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
  },

});
