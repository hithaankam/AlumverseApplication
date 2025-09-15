import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AxiosError } from 'axios';
import { AuthStyles } from '../styles/AuthStyles';
import Colors from '../constants/Colors'; // Import Colors
import { authService } from '@/services/AlumService'; 

interface AuthFormState {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  showPassword: boolean;
  showConfirmPassword?: boolean;
}

const AuthScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  
  const [loginForm, setLoginForm] = useState<AuthFormState>({
    email: '',
    password: '',
    showPassword: false,
  });

  const [signupForm, setSignupForm] = useState<AuthFormState>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  useEffect(() => {
    if (params.form === 'signup') {
      setIsFlipped(true);
      flipAnim.setValue(180);
    }
  }, [params.form]);

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
    opacity: flipAnim.interpolate({ inputRange: [0, 90], outputRange: [1, 0] }),
  };

  const backAnimatedStyle = {
    transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
    opacity: flipAnim.interpolate({ inputRange: [90, 180], outputRange: [0, 1] }),
  };

const handleLogin = async () => {
  console.log("1. Login button pressed."); // See if the function starts
  console.log("2. Sending data:", { email: loginForm.email, password: loginForm.password }); // Check the data
  try {
    const response = await authService.login({
      email: loginForm.email,
      password: loginForm.password,
    });
    console.log("3. API call successful:", response.data); // See the response
    authService.storeToken(response.data.accessToken);
    router.push('/home');
  } catch (error) {
    console.error("4. API call failed:", error); // See the exact error
    // ... your alert code
  }
};
  const handleSignup = async () => {
    if (signupForm.password !== signupForm.confirmPassword) {
        Alert.alert('Signup Error', 'Passwords do not match.');
        return;
    }

    try {
        // First, register the new user
        await authService.register({
            fullName: signupForm.fullName,
            email: signupForm.email,
            password: signupForm.password,
        });

        Alert.alert('Success', 'Registration successful! Logging you in...');

        // Then, automatically log them in
        const loginResponse = await authService.login({
            email: signupForm.email,
            password: signupForm.password,
        });

        // Store the token and navigate to the home screen
        authService.storeToken(loginResponse.data.accessToken);
        router.push('/home');

    } catch (error) {
        let errorMessage = 'An unexpected error occurred.';
        if (error instanceof AxiosError) {
          errorMessage = error.response?.data || 'Signup failed. Please try again.';
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        Alert.alert('Signup Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={AuthStyles.container}
      keyboardVerticalOffset={100}
    >
      <Image source={require('../assets/images/logo.png')} style={AuthStyles.logo} />
      <View style={AuthStyles.cardContainer}>
        {/* Login Card */}
        <Animated.View style={[AuthStyles.card, AuthStyles.loginCard, frontAnimatedStyle]}>
          <Text style={AuthStyles.cardTitle}>Welcome Back!</Text>
          
          <View style={AuthStyles.inputContainer}>
            <Text style={AuthStyles.label}>Email</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your email"
              value={loginForm.email}
              onChangeText={(text) => setLoginForm({...loginForm, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={AuthStyles.inputContainer}>
            <Text style={AuthStyles.label}>Password</Text>
            <View style={AuthStyles.passwordInputContainer}>
              <TextInput
                style={[AuthStyles.input, { flex: 1 }]}
                placeholder="Enter your password"
                value={loginForm.password}
                onChangeText={(text) => setLoginForm({...loginForm, password: text})}
                secureTextEntry={!loginForm.showPassword}
              />
              <TouchableOpacity
                style={AuthStyles.eyeIcon}
                onPress={() => setLoginForm({...loginForm, showPassword: !loginForm.showPassword})}
              >
                <Ionicons
                  name={loginForm.showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={AuthStyles.loginButton} onPress={handleLogin}>
            <Text style={AuthStyles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={flipCard}>
            <Text style={AuthStyles.loginLinkText}>New here? Sign up →</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Signup Card */}
        <Animated.View style={[AuthStyles.card, AuthStyles.signupCard, backAnimatedStyle]}>
          <Text style={AuthStyles.cardTitle}>Create Account</Text>
          
          <View style={AuthStyles.inputContainer}>
            <Text style={AuthStyles.label}>Full Name</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your full name"
              value={signupForm.fullName}
              onChangeText={(text) => setSignupForm({...signupForm, fullName: text})}
            />
          </View>
          
          <View style={AuthStyles.inputContainer}>
            <Text style={AuthStyles.label}>Email</Text>
            <TextInput
              style={AuthStyles.input}
              placeholder="Enter your email"
              value={signupForm.email}
              onChangeText={(text) => setSignupForm({...signupForm, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={AuthStyles.inputContainer}>
            <Text style={AuthStyles.label}>Password</Text>
            <View style={AuthStyles.passwordInputContainer}>
              <TextInput
                style={[AuthStyles.input, { flex: 1 }]}
                placeholder="Create password"
                value={signupForm.password}
                onChangeText={(text) => setSignupForm({...signupForm, password: text})}
                secureTextEntry={!signupForm.showPassword}
              />
              <TouchableOpacity
                style={AuthStyles.eyeIcon}
                onPress={() => setSignupForm({...signupForm, showPassword: !signupForm.showPassword})}
              >
                <Ionicons
                  name={signupForm.showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={AuthStyles.inputContainer}>
            <Text style={AuthStyles.label}>Confirm Password</Text>
            <View style={AuthStyles.passwordInputContainer}>
              <TextInput
                style={[AuthStyles.input, { flex: 1 }]}
                placeholder="Confirm password"
                value={signupForm.confirmPassword}
                onChangeText={(text) => setSignupForm({...signupForm, confirmPassword: text})}
                secureTextEntry={!signupForm.showConfirmPassword}
              />
              <TouchableOpacity
                style={AuthStyles.eyeIcon}
                onPress={() => setSignupForm({...signupForm, showConfirmPassword: !signupForm.showConfirmPassword})}
              >
                <Ionicons
                  name={signupForm.showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={AuthStyles.signupButtonRow}>
            <TouchableOpacity style={AuthStyles.signupSecondaryButton} onPress={flipCard}>
              <Ionicons name="arrow-back" size={20} color={Colors.primaryDark} />
              <Text style={AuthStyles.signupButtonText}> Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={AuthStyles.signupPrimaryButton} onPress={handleSignup}>
              <Text style={AuthStyles.buttonText}>Sign Up</Text>
              <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
