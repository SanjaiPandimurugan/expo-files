import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

export default function ChildHealthScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for children
  const children = [
    {
      id: '1',
      name: 'Arjun Kumar',
      age: '2 years',
      gender: 'Male',
      parent: 'Raj Kumar',
      lastVisit: '5 days ago',
      healthStatus: 'normal',
      nextImmunization: '15 June 2023',
      immunizationStatus: 'On track'
    },
    {
      id: '2',
      name: 'Sonia Sharma',
      age: '4 years',
      gender: 'Female',
      parent: 'Priya Sharma',
      lastVisit: '2 weeks ago',
      healthStatus: 'normal',
      nextImmunization: 'Completed',
      immunizationStatus: 'Completed'
    },
    {
      id: '3',
      name: 'Vikram Singh',
      age: '8 months',
      gender: 'Male',
      parent: 'Meena Singh',
      lastVisit: '1 month ago',
      healthStatus: 'concern',
      nextImmunization: '30 May 2023',
      immunizationStatus: 'Pending'
    },
    {
      id: '4',
      name: 'Ananya Patel',
      age: '3 years',
      gender: 'Female',
      parent: 'Asha Patel',
      lastVisit: '3 days ago',
      healthStatus: 'normal',
      nextImmunization: 'Completed',
      immunizationStatus: 'Completed'
    },
    {
      id: '5',
      name: 'Rahul Verma',
      age: '1 year',
      gender: 'Male',
      parent: 'Sunita Verma',
      lastVisit: '1 week ago',
      healthStatus: 'concern',
      nextImmunization: '10 June 2023',
      immunizationStatus: 'Delayed'
    },
  ];

  // Filter based on search query
  const filteredChildren = children.filter(child => 
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.parent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Various status counts
  const totalCount = children.length;
  const healthConcernCount = children.filter(c => c.healthStatus === 'concern').length;
  const pendingImmunizationCount = children.filter(c => 
    c.immunizationStatus === 'Pending' || c.immunizationStatus === 'Delayed'
  ).length;
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header 
        title="Child Health" 
        showBack={true}
        showNotification={true}
        bgColor="#3b82f6"
      />
      <ScrollView className="flex-1 bg-slate-50">
        <View className="p-4 bg-blue-600">
          <View className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
            <TextInput
              className="p-4 pl-12"
              placeholder="Search by child or parent name..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View className="absolute left-4 top-4">
              <Ionicons name="search" size={20} color="#9ca3af" />
            </View>
          </View>
          
          <View className="flex-row justify-between bg-white rounded-lg p-2 shadow-sm">
            <View className="flex-1 items-center p-2">
              <Text className="text-2xl font-bold text-gray-800">{totalCount}</Text>
              <Text className="text-xs text-gray-500">Total</Text>
            </View>
            <View className="flex-1 items-center p-2 border-x border-gray-100">
              <Text className="text-2xl font-bold text-red-500">{healthConcernCount}</Text>
              <Text className="text-xs text-gray-500">Health Concerns</Text>
            </View>
            <View className="flex-1 items-center p-2">
              <Text className="text-2xl font-bold text-yellow-500">{pendingImmunizationCount}</Text>
              <Text className="text-xs text-gray-500">Pending Vaccines</Text>
            </View>
          </View>
        </View>

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Children</Text>
            <TouchableOpacity className="bg-blue-600 py-2 px-4 rounded-lg flex-row items-center">
              <Ionicons name="add" size={18} color="white" />
              <Text className="text-white ml-1">Add New</Text>
            </TouchableOpacity>
          </View>

          {filteredChildren.map((child) => (
            <TouchableOpacity 
              key={child.id}
              className="bg-white mb-4 rounded-lg shadow-sm overflow-hidden"
            >
              <View className="p-4">
                <View className="flex-row justify-between items-start">
                  <View className="flex-row items-center">
                    <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Text className="text-blue-600 font-bold">{child.name.charAt(0)}</Text>
                    </View>
                    <View>
                      <Text className="text-gray-800 font-medium">{child.name}</Text>
                      <Text className="text-gray-500 text-sm">{child.age} • {child.gender}</Text>
                      <Text className="text-gray-500 text-sm">Parent: {child.parent}</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
                    <Ionicons name="ellipsis-vertical" size={18} color="#4b5563" />
                  </TouchableOpacity>
                </View>
                
                <View className="flex-row mt-4 justify-between">
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Last Visit</Text>
                    <Text className="text-gray-700">{child.lastVisit}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Health Status</Text>
                    <View className="flex-row items-center">
                      <View 
                        className={`w-2 h-2 rounded-full mr-1 ${
                          child.healthStatus === 'concern' ? 'bg-red-500' : 'bg-green-500'
                        }`} 
                      />
                      <Text className={`${
                        child.healthStatus === 'concern' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {child.healthStatus.charAt(0).toUpperCase() + child.healthStatus.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Immunization</Text>
                    <Text className={`${
                      child.immunizationStatus === 'Delayed' ? 'text-red-600' :
                      child.immunizationStatus === 'Pending' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {child.immunizationStatus}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View className="flex-row border-t border-gray-100">
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="medkit-outline" size={16} color="#4f46e5" />
                  <Text className="text-indigo-600 ml-1">Immunize</Text>
                </TouchableOpacity>
                <View className="w-[1px] bg-gray-100" />
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="create-outline" size={16} color="#4f46e5" />
                  <Text className="text-indigo-600 ml-1">Growth Record</Text>
                </TouchableOpacity>
                <View className="w-[1px] bg-gray-100" />
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="calendar-outline" size={16} color="#4f46e5" />
                  <Text className="text-indigo-600 ml-1">Schedule</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          
          {filteredChildren.length === 0 && (
            <View className="items-center justify-center p-8">
              <Ionicons name="search" size={48} color="#d1d5db" />
              <Text className="text-gray-500 mt-4 text-center">No children found matching your search.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
} 