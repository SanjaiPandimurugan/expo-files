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

export default function SignupScreen() {
  const router = useRouter();
  const { login } = useAuth(); // Use the auth hook
  const [selectedRole, setSelectedRole] = useState<'asha' | 'anm' | 'seeker' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    region: '',
    // ASHA & ANM specific fields
    idNumber: '',
    healthCenter: '',
    qualification: '',
    experience: '',
    // Seeker specific fields
    age: '',
    gender: '',
    address: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [genderSelected, setGenderSelected] = useState<'male' | 'female' | 'other' | null>(null);

  // Update form data
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle signup
  const handleSignup = () => {
    // Validation
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role');
      return;
    }

    // Common validations for all roles
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.region) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Role-specific validations
    if ((selectedRole === 'asha' || selectedRole === 'anm') && 
        (!formData.idNumber || !formData.healthCenter)) {
      Alert.alert('Error', 'Please fill all required fields for healthcare workers');
      return;
    }

    if (selectedRole === 'seeker' && (!formData.age || !genderSelected)) {
      Alert.alert('Error', 'Please fill all required fields for care seekers');
      return;
    }

    // In a real app, this would send data to a backend for account creation
    // For this demo, just show success and go to login
    Alert.alert(
      'Account Created!', 
      `Your ${selectedRole.toUpperCase()} account has been created successfully. Please login with your credentials.`,
      [{ 
        text: 'OK', 
        onPress: () => {
          // Optionally, we could auto-login the user here using the auth context
          // login(selectedRole);
          // router.replace(`/screens/${selectedRole}/dashboard`);
          
          // But for demonstration purposes, we'll redirect to login
          router.replace('/login');
        } 
      }]
    );
  };

  // Toggle password visibility
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleConfirmSecureEntry = () => {
    setConfirmSecureTextEntry(!confirmSecureTextEntry);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView className="flex-1 bg-white">
          <View className="flex-1 p-6">
            {/* Logo and Header */}
            <View className="items-center my-6">
              <Logo size="small" variant="icon-only" />
              <Text className="text-2xl font-bold text-gray-800 mt-2">Create Account</Text>
              <Text className="text-base text-gray-500 text-center mt-2">
                Join VitaWave as a healthcare worker or care seeker
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

            {/* Common Form Fields */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Full Name <Text className="text-red-500">*</Text></Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="person-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800 py-2"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(value) => handleChange('name', value)}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Email Address <Text className="text-red-500">*</Text></Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="mail-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800 py-2"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChangeText={(value) => handleChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Phone Number <Text className="text-red-500">*</Text></Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="call-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800 py-2"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChangeText={(value) => handleChange('phone', value)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Region/District <Text className="text-red-500">*</Text></Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="location-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800 py-2"
                  placeholder="Enter your region or district"
                  value={formData.region}
                  onChangeText={(value) => handleChange('region', value)}
                />
              </View>
            </View>

            {/* Password Fields */}
            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Password <Text className="text-red-500">*</Text></Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800 py-2"
                  placeholder="Create a password"
                  value={formData.password}
                  onChangeText={(value) => handleChange('password', value)}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity onPress={toggleSecureEntry}>
                  <Ionicons 
                    name={secureTextEntry ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-medium mb-2">Confirm Password <Text className="text-red-500">*</Text></Text>
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
                <TextInput
                  className="flex-1 ml-2 text-gray-800 py-2"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleChange('confirmPassword', value)}
                  secureTextEntry={confirmSecureTextEntry}
                />
                <TouchableOpacity onPress={toggleConfirmSecureEntry}>
                  <Ionicons 
                    name={confirmSecureTextEntry ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Role-specific Fields */}
            {(selectedRole === 'asha' || selectedRole === 'anm') && (
              <View className="mb-4">
                <View className="p-4 bg-indigo-50 rounded-lg mb-4">
                  <Text className="text-indigo-800 font-semibold mb-2">
                    {selectedRole === 'asha' ? 'ASHA Worker Details' : 'ANM Worker Details'}
                  </Text>
                  
                  <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">
                      ID Number <Text className="text-red-500">*</Text>
                    </Text>
                    <View className="flex-row items-center bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <Ionicons name="card-outline" size={20} color="#6b7280" />
                      <TextInput
                        className="flex-1 ml-2 text-gray-800 py-2"
                        placeholder="Enter your ID number"
                        value={formData.idNumber}
                        onChangeText={(value) => handleChange('idNumber', value)}
                      />
                    </View>
                  </View>
                  
                  <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">
                      Health Center <Text className="text-red-500">*</Text>
                    </Text>
                    <View className="flex-row items-center bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <Ionicons name="business-outline" size={20} color="#6b7280" />
                      <TextInput
                        className="flex-1 ml-2 text-gray-800 py-2"
                        placeholder="Enter your health center"
                        value={formData.healthCenter}
                        onChangeText={(value) => handleChange('healthCenter', value)}
                      />
                    </View>
                  </View>
                  
                  <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">
                      Qualification
                    </Text>
                    <View className="flex-row items-center bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <Ionicons name="school-outline" size={20} color="#6b7280" />
                      <TextInput
                        className="flex-1 ml-2 text-gray-800 py-2"
                        placeholder="Enter your qualification"
                        value={formData.qualification}
                        onChangeText={(value) => handleChange('qualification', value)}
                      />
                    </View>
                  </View>
                  
                  <View>
                    <Text className="text-gray-700 font-medium mb-2">
                      Experience (years)
                    </Text>
                    <View className="flex-row items-center bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <Ionicons name="time-outline" size={20} color="#6b7280" />
                      <TextInput
                        className="flex-1 ml-2 text-gray-800 py-2"
                        placeholder="Years of experience"
                        value={formData.experience}
                        onChangeText={(value) => handleChange('experience', value)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}

            {selectedRole === 'seeker' && (
              <View className="mb-4">
                <View className="p-4 bg-green-50 rounded-lg mb-4">
                  <Text className="text-green-800 font-semibold mb-2">
                    Care Seeker Details
                  </Text>
                  
                  <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">
                      Age <Text className="text-red-500">*</Text>
                    </Text>
                    <View className="flex-row items-center bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <Ionicons name="calendar-outline" size={20} color="#6b7280" />
                      <TextInput
                        className="flex-1 ml-2 text-gray-800 py-2"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChangeText={(value) => handleChange('age', value)}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                  
                  <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">
                      Gender <Text className="text-red-500">*</Text>
                    </Text>
                    <View className="flex-row">
                      <TouchableOpacity 
                        className={`flex-1 p-2 rounded-l-lg border ${
                          genderSelected === 'male' 
                            ? 'bg-green-100 border-green-300' 
                            : 'bg-white border-gray-200'
                        } flex-row justify-center items-center`}
                        onPress={() => {
                          setGenderSelected('male');
                          handleChange('gender', 'male');
                        }}
                      >
                        <Ionicons 
                          name="male" 
                          size={18} 
                          color={genderSelected === 'male' ? '#10b981' : '#6b7280'} 
                        />
                        <Text 
                          className={`ml-1 ${
                            genderSelected === 'male' ? 'text-green-700' : 'text-gray-700'
                          }`}
                        >
                          Male
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        className={`flex-1 p-2 border-t border-b border-r ${
                          genderSelected === 'female' 
                            ? 'bg-green-100 border-green-300' 
                            : 'bg-white border-gray-200'
                        } flex-row justify-center items-center`}
                        onPress={() => {
                          setGenderSelected('female');
                          handleChange('gender', 'female');
                        }}
                      >
                        <Ionicons 
                          name="female" 
                          size={18} 
                          color={genderSelected === 'female' ? '#10b981' : '#6b7280'} 
                        />
                        <Text 
                          className={`ml-1 ${
                            genderSelected === 'female' ? 'text-green-700' : 'text-gray-700'
                          }`}
                        >
                          Female
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        className={`flex-1 p-2 rounded-r-lg border-t border-b border-r ${
                          genderSelected === 'other' 
                            ? 'bg-green-100 border-green-300' 
                            : 'bg-white border-gray-200'
                        } flex-row justify-center items-center`}
                        onPress={() => {
                          setGenderSelected('other');
                          handleChange('gender', 'other');
                        }}
                      >
                        <Ionicons 
                          name="person" 
                          size={18} 
                          color={genderSelected === 'other' ? '#10b981' : '#6b7280'} 
                        />
                        <Text 
                          className={`ml-1 ${
                            genderSelected === 'other' ? 'text-green-700' : 'text-gray-700'
                          }`}
                        >
                          Other
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <View>
                    <Text className="text-gray-700 font-medium mb-2">
                      Home Address
                    </Text>
                    <View className="bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <TextInput
                        className="text-gray-800 py-2"
                        placeholder="Enter your full address"
                        value={formData.address}
                        onChangeText={(value) => handleChange('address', value)}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Signup Button */}
            <TouchableOpacity
              className={`rounded-lg py-3 items-center mb-6 ${
                selectedRole ? 
                selectedRole === 'asha' ? 'bg-indigo-600' :
                selectedRole === 'anm' ? 'bg-purple-600' :
                'bg-green-600' : 'bg-gray-400'
              }`}
              onPress={handleSignup}
              disabled={!selectedRole}
            >
              <Text className="text-white font-bold text-lg">Create Account</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text className="text-indigo-600 font-medium">Log In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
} 