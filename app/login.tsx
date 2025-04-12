import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './_layout'; // Import the auth hook
import Logo from './components/Logo';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth(); // Use the auth hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'asha' | 'anm' | 'seeker' | null>(null);

  const handleLogin = () => {
    // Simple validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (!selectedRole) {
      Alert.alert('Error', 'Please select your role');
      return;
    }

    // Demo login logic - in a real app, this would authenticate with a backend
    // For now, we'll just route to the appropriate dashboard based on the role
    
    // Mock emails for different roles for demo purposes
    const mockUsers = {
      asha: 'asha@vitawave.com',
      anm: 'anm@vitawave.com',
      seeker: 'seeker@vitawave.com'
    };

    // Check if the email matches the role
    if (email.toLowerCase() === mockUsers[selectedRole]) {
      // Use the login function from auth context
      login(selectedRole);
      
      // Navigate to the appropriate dashboard
      switch (selectedRole) {
        case 'asha':
          router.replace('/screens/asha/dashboard');
          break;
        case 'anm':
          router.replace('/screens/anm/dashboard');
          break;
        case 'seeker':
          router.replace('/screens/seeker/dashboard');
          break;
      }
    } else {
      Alert.alert('Error', `Please use the correct email for ${selectedRole} role or sign up for a new account.`);
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 bg-white">
          <View className="flex-1 p-6">
            {/* Logo and Header */}
            <View className="items-center my-8">
              <Logo size="medium" variant="icon-only" />
              <Text className="text-2xl font-bold text-gray-800 mt-2">Welcome to VitaWave</Text>
              <Text className="text-base text-gray-500 text-center mt-2">
                Login to access your dashboard
              </Text>
            </View>

            {/* Role Selection */}
            <Text className="text-gray-700 font-medium mb-2">Select Your Role:</Text>
            <View className="flex-row justify-between mb-6">
              <TouchableOpacity 
                className={`flex-1 p-3 rounded-lg mr-2 items-center ${
                  selectedRole === 'asha' ? 'bg-indigo-600' : 'bg-gray-100'
                }`}
                onPress={() => setSelectedRole('asha')}
              >
                <Ionicons 
                  name="medical" 
                  size={24} 
                  color={selectedRole === 'asha' ? 'white' : '#4f46e5'} 
                />
                <Text 
                  className={`mt-1 font-medium ${
                    selectedRole === 'asha' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  ASHA Worker
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={`flex-1 p-3 rounded-lg mx-1 items-center ${
                  selectedRole === 'anm' ? 'bg-purple-600' : 'bg-gray-100'
                }`}
                onPress={() => setSelectedRole('anm')}
              >
                <Ionicons 
                  name="medkit" 
                  size={24} 
                  color={selectedRole === 'anm' ? 'white' : '#7e22ce'} 
                />
                <Text 
                  className={`mt-1 font-medium ${
                    selectedRole === 'anm' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  ANM Worker
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={`flex-1 p-3 rounded-lg ml-2 items-center ${
                  selectedRole === 'seeker' ? 'bg-green-600' : 'bg-gray-100'
                }`}
                onPress={() => setSelectedRole('seeker')}
              >
                <Ionicons 
                  name="person" 
                  size={24} 
                  color={selectedRole === 'seeker' ? 'white' : '#10b981'} 
                />
                <Text 
                  className={`mt-1 font-medium ${
                    selectedRole === 'seeker' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  Care Seeker
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Form */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Email Address</Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="mail-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800 py-2"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2">Password</Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800 py-2"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity onPress={toggleSecureTextEntry}>
                  <Ionicons 
                    name={secureTextEntry ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-indigo-600 rounded-lg py-3 items-center"
              onPress={handleLogin}
            >
              <Text className="text-white font-bold text-lg">Log In</Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity className="items-center mt-4">
              <Text className="text-indigo-600">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Signup Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-600">Don't have an account? </Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text className="text-indigo-600 font-medium">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Role-specific login hints */}
            {selectedRole && (
              <View className="mt-6 p-4 bg-gray-50 rounded-lg">
                <Text className="text-gray-500 text-sm text-center">
                  <Text className="font-medium">Demo Login: </Text>
                  {selectedRole === 'asha' && "Use asha@vitawave.com"}
                  {selectedRole === 'anm' && "Use anm@vitawave.com"}
                  {selectedRole === 'seeker' && "Use seeker@vitawave.com"}
                  {" with any password"}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
} 