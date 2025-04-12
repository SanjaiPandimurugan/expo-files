import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegistrationScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    village: '',
    aadhar: '',
    medicalHistory: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
  });

  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'other' | ''>('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', age: '', gender: '', phone: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
      isValid = false;
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = 'Please enter a valid age';
      isValid = false;
    }

    if (!selectedGender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, you would save this data to a database/API
      Alert.alert(
        'Success',
        'Patient registration completed successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/'),
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Please fill all required fields correctly');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Patient Registration',
        }}
      />
      <ScrollView className="flex-1 bg-slate-50">
        <View className="p-4 bg-indigo-600">
          <Text className="text-white text-lg mb-1">Register New Patient</Text>
          <Text className="text-white text-sm opacity-80">Fill in the details below</Text>
        </View>

        <View className="p-4">
          {/* Personal Information Section */}
          <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <Text className="text-gray-800 font-semibold text-lg mb-4">Personal Information</Text>
            
            {/* Name */}
            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Full Name <Text className="text-red-500">*</Text></Text>
              <TextInput
                className={`border ${errors.name ? 'border-red-400' : 'border-gray-300'} p-3 rounded-lg`}
                placeholder="Enter full name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
              {errors.name ? <Text className="text-red-500 text-xs mt-1">{errors.name}</Text> : null}
            </View>
            
            {/* Age and Gender */}
            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-gray-700 mb-1">Age <Text className="text-red-500">*</Text></Text>
                <TextInput
                  className={`border ${errors.age ? 'border-red-400' : 'border-gray-300'} p-3 rounded-lg`}
                  placeholder="Age"
                  keyboardType="numeric"
                  value={formData.age}
                  onChangeText={(text) => handleInputChange('age', text)}
                />
                {errors.age ? <Text className="text-red-500 text-xs mt-1">{errors.age}</Text> : null}
              </View>
              
              <View className="flex-1 ml-2">
                <Text className="text-gray-700 mb-1">Gender <Text className="text-red-500">*</Text></Text>
                <View className="flex-row mt-2">
                  <TouchableOpacity 
                    className={`flex-1 p-2 rounded-l-lg border flex-row justify-center items-center ${
                      selectedGender === 'male' 
                        ? 'bg-indigo-100 border-indigo-300' 
                        : 'bg-white border-gray-300'
                    }`}
                    onPress={() => {
                      setSelectedGender('male');
                      handleInputChange('gender', 'male');
                    }}
                  >
                    <Ionicons 
                      name="male" 
                      size={18} 
                      color={selectedGender === 'male' ? '#4f46e5' : '#6b7280'} 
                    />
                    <Text 
                      className={`text-sm ml-1 ${
                        selectedGender === 'male' ? 'text-indigo-700' : 'text-gray-700'
                      }`}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    className={`flex-1 p-2 border-t border-b border-r flex-row justify-center items-center ${
                      selectedGender === 'female' 
                        ? 'bg-indigo-100 border-indigo-300' 
                        : 'bg-white border-gray-300'
                    }`}
                    onPress={() => {
                      setSelectedGender('female');
                      handleInputChange('gender', 'female');
                    }}
                  >
                    <Ionicons 
                      name="female" 
                      size={18} 
                      color={selectedGender === 'female' ? '#4f46e5' : '#6b7280'} 
                    />
                    <Text 
                      className={`text-sm ml-1 ${
                        selectedGender === 'female' ? 'text-indigo-700' : 'text-gray-700'
                      }`}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    className={`flex-1 p-2 rounded-r-lg border-t border-b border-r flex-row justify-center items-center ${
                      selectedGender === 'other' 
                        ? 'bg-indigo-100 border-indigo-300' 
                        : 'bg-white border-gray-300'
                    }`}
                    onPress={() => {
                      setSelectedGender('other');
                      handleInputChange('gender', 'other');
                    }}
                  >
                    <Ionicons 
                      name="person" 
                      size={18} 
                      color={selectedGender === 'other' ? '#4f46e5' : '#6b7280'} 
                    />
                    <Text 
                      className={`text-sm ml-1 ${
                        selectedGender === 'other' ? 'text-indigo-700' : 'text-gray-700'
                      }`}
                    >
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.gender ? <Text className="text-red-500 text-xs mt-1">{errors.gender}</Text> : null}
              </View>
            </View>
            
            {/* Phone */}
            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Phone Number <Text className="text-red-500">*</Text></Text>
              <TextInput
                className={`border ${errors.phone ? 'border-red-400' : 'border-gray-300'} p-3 rounded-lg`}
                placeholder="10-digit phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
              />
              {errors.phone ? <Text className="text-red-500 text-xs mt-1">{errors.phone}</Text> : null}
            </View>
          </View>
          
          {/* Address Section */}
          <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <Text className="text-gray-800 font-semibold text-lg mb-4">Address Information</Text>
            
            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Village/Town</Text>
              <TextInput
                className="border border-gray-300 p-3 rounded-lg"
                placeholder="Enter village or town name"
                value={formData.village}
                onChangeText={(text) => handleInputChange('village', text)}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-700 mb-1">Full Address</Text>
              <TextInput
                className="border border-gray-300 p-3 rounded-lg"
                placeholder="Enter full address"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={formData.address}
                onChangeText={(text) => handleInputChange('address', text)}
              />
            </View>
            
            <View className="mb-2">
              <Text className="text-gray-700 mb-1">Aadhar Number (Optional)</Text>
              <TextInput
                className="border border-gray-300 p-3 rounded-lg"
                placeholder="Enter 12-digit Aadhar number"
                keyboardType="numeric"
                value={formData.aadhar}
                onChangeText={(text) => handleInputChange('aadhar', text)}
              />
            </View>
          </View>
          
          {/* Medical History */}
          <View className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <Text className="text-gray-800 font-semibold text-lg mb-4">Medical Information</Text>
            
            <View>
              <Text className="text-gray-700 mb-1">Medical History</Text>
              <TextInput
                className="border border-gray-300 p-3 rounded-lg"
                placeholder="Enter any relevant medical history"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={formData.medicalHistory}
                onChangeText={(text) => handleInputChange('medicalHistory', text)}
              />
            </View>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity
            className="bg-indigo-600 p-4 rounded-lg w-full mb-10 items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white font-bold text-lg">Register Patient</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
} 