import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MaternalHealthScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for pregnant women
  const pregnantWomen = [
    {
      id: '1',
      name: 'Priya Sharma',
      age: 26,
      months: 7,
      lastVisit: '10 days ago',
      riskStatus: 'normal',
      nextVisit: '15 May 2023',
    },
    {
      id: '2',
      name: 'Meena Verma',
      age: 30,
      months: 4,
      lastVisit: '2 days ago',
      riskStatus: 'normal',
      nextVisit: '30 Apr 2023',
    },
    {
      id: '3',
      name: 'Sunita Devi',
      age: 19,
      months: 8,
      lastVisit: '15 days ago',
      riskStatus: 'high',
      nextVisit: '22 Apr 2023',
    },
    {
      id: '4',
      name: 'Pooja Gupta',
      age: 28,
      months: 3,
      lastVisit: '5 days ago',
      riskStatus: 'normal',
      nextVisit: '10 May 2023',
    },
    {
      id: '5',
      name: 'Asha Patel',
      age: 32,
      months: 6,
      lastVisit: '8 days ago',
      riskStatus: 'medium',
      nextVisit: '27 Apr 2023',
    },
  ];

  // Filter based on search query
  const filteredWomen = pregnantWomen.filter(woman => 
    woman.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Various status counts
  const totalCount = pregnantWomen.length;
  const highRiskCount = pregnantWomen.filter(w => w.riskStatus === 'high').length;
  const thirdTrimesterCount = pregnantWomen.filter(w => w.months >= 7).length;
  
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Maternal Health',
        }}
      />
      <ScrollView className="flex-1 bg-slate-50">
        <View className="p-4 bg-pink-600">
          <View className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
            <TextInput
              className="p-4 pl-12"
              placeholder="Search by name..."
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
              <Text className="text-2xl font-bold text-red-500">{highRiskCount}</Text>
              <Text className="text-xs text-gray-500">High Risk</Text>
            </View>
            <View className="flex-1 items-center p-2">
              <Text className="text-2xl font-bold text-gray-800">{thirdTrimesterCount}</Text>
              <Text className="text-xs text-gray-500">3rd Trimester</Text>
            </View>
          </View>
        </View>

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Pregnant Women</Text>
            <TouchableOpacity className="bg-pink-600 py-2 px-4 rounded-lg flex-row items-center">
              <Ionicons name="add" size={18} color="white" />
              <Text className="text-white ml-1">Add New</Text>
            </TouchableOpacity>
          </View>

          {filteredWomen.map((woman) => (
            <TouchableOpacity 
              key={woman.id}
              className="bg-white mb-4 rounded-lg shadow-sm overflow-hidden"
            >
              <View className="p-4">
                <View className="flex-row justify-between items-start">
                  <View className="flex-row items-center">
                    <View className="bg-pink-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Text className="text-pink-600 font-bold">{woman.name.charAt(0)}</Text>
                    </View>
                    <View>
                      <Text className="text-gray-800 font-medium">{woman.name}</Text>
                      <Text className="text-gray-500 text-sm">{woman.age} years • {woman.months} months pregnant</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
                    <Ionicons name="ellipsis-vertical" size={18} color="#4b5563" />
                  </TouchableOpacity>
                </View>
                
                <View className="flex-row mt-4 justify-between">
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Last Visit</Text>
                    <Text className="text-gray-700">{woman.lastVisit}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Risk Status</Text>
                    <View className="flex-row items-center">
                      <View 
                        className={`w-2 h-2 rounded-full mr-1 ${
                          woman.riskStatus === 'high' ? 'bg-red-500' : 
                          woman.riskStatus === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} 
                      />
                      <Text className={`${
                        woman.riskStatus === 'high' ? 'text-red-600' : 
                        woman.riskStatus === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {woman.riskStatus.charAt(0).toUpperCase() + woman.riskStatus.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500">Next Visit</Text>
                    <Text className="text-gray-700">{woman.nextVisit}</Text>
                  </View>
                </View>
              </View>
              
              <View className="flex-row border-t border-gray-100">
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="create-outline" size={16} color="#4f46e5" />
                  <Text className="text-indigo-600 ml-1">Update</Text>
                </TouchableOpacity>
                <View className="w-[1px] bg-gray-100" />
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="call-outline" size={16} color="#4f46e5" />
                  <Text className="text-indigo-600 ml-1">Call</Text>
                </TouchableOpacity>
                <View className="w-[1px] bg-gray-100" />
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="calendar-outline" size={16} color="#4f46e5" />
                  <Text className="text-indigo-600 ml-1">Schedule</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          
          {filteredWomen.length === 0 && (
            <View className="items-center justify-center p-8">
              <Ionicons name="search" size={48} color="#d1d5db" />
              <Text className="text-gray-500 mt-4 text-center">No pregnant women found matching your search.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
} 