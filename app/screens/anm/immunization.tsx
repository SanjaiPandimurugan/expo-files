import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ImmunizationScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for immunization records
  const immunizationData = {
    upcoming: [
      {
        id: '1',
        name: 'Baby Arjun',
        age: '6 months',
        vaccine: 'OPV-3, Pentavalent-3',
        dueDate: 'Today',
        parentName: 'Ravi Kumar',
        contact: '9876543210',
      },
      {
        id: '2',
        name: 'Baby Sita',
        age: '9 months',
        vaccine: 'MMR',
        dueDate: 'Tomorrow',
        parentName: 'Neha Sharma',
        contact: '9876543211',
      },
      {
        id: '3',
        name: 'Baby Akash',
        age: '10 weeks',
        vaccine: 'OPV-2, Pentavalent-2',
        dueDate: 'In 2 days',
        parentName: 'Manoj Singh',
        contact: '9876543212',
      },
      {
        id: '4',
        name: 'Baby Leela',
        age: '14 weeks',
        vaccine: 'OPV-3, Pentavalent-3',
        dueDate: 'In 3 days',
        parentName: 'Kavita Patel',
        contact: '9876543213',
      },
    ],
    completed: [
      {
        id: '5',
        name: 'Baby Rohan',
        age: '6 weeks',
        vaccine: 'OPV-1, Pentavalent-1',
        completedDate: '2 days ago',
        parentName: 'Anita Gupta',
        contact: '9876543214',
      },
      {
        id: '6',
        name: 'Baby Meera',
        age: '9 months',
        vaccine: 'MMR',
        completedDate: '3 days ago',
        parentName: 'Suresh Verma',
        contact: '9876543215',
      },
      {
        id: '7',
        name: 'Baby Rahul',
        age: '16 months',
        vaccine: 'DPT Booster',
        completedDate: '1 week ago',
        parentName: 'Priya Das',
        contact: '9876543216',
      },
    ],
    overdue: [
      {
        id: '8',
        name: 'Baby Tina',
        age: '10 months',
        vaccine: 'MMR',
        overdueBy: '2 weeks',
        parentName: 'Rajesh Patel',
        contact: '9876543217',
      },
      {
        id: '9',
        name: 'Baby Vikram',
        age: '18 months',
        vaccine: 'DPT Booster',
        overdueBy: '1 month',
        parentName: 'Sneha Rao',
        contact: '9876543218',
      },
    ],
  };

  // Filtered data based on search
  const filteredData = {
    upcoming: immunizationData.upcoming.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parentName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    completed: immunizationData.completed.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parentName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    overdue: immunizationData.overdue.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.parentName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  };

  const activeData = filteredData[activeTab];

  // Statistics for the summary card
  const totalUpcoming = immunizationData.upcoming.length;
  const totalCompleted = immunizationData.completed.length;
  const totalOverdue = immunizationData.overdue.length;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Immunization',
        }}
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
            <TouchableOpacity 
              className="flex-1 items-center p-2"
              onPress={() => setActiveTab('upcoming')}
            >
              <Text className={`text-2xl font-bold ${activeTab === 'upcoming' ? 'text-blue-600' : 'text-gray-800'}`}>
                {totalUpcoming}
              </Text>
              <Text className={`text-xs ${activeTab === 'upcoming' ? 'text-blue-600' : 'text-gray-500'}`}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 items-center p-2 border-x border-gray-100"
              onPress={() => setActiveTab('completed')}
            >
              <Text className={`text-2xl font-bold ${activeTab === 'completed' ? 'text-green-600' : 'text-gray-800'}`}>
                {totalCompleted}
              </Text>
              <Text className={`text-xs ${activeTab === 'completed' ? 'text-green-600' : 'text-gray-500'}`}>
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 items-center p-2"
              onPress={() => setActiveTab('overdue')}
            >
              <Text className={`text-2xl font-bold ${activeTab === 'overdue' ? 'text-red-600' : 'text-gray-800'}`}>
                {totalOverdue}
              </Text>
              <Text className={`text-xs ${activeTab === 'overdue' ? 'text-red-600' : 'text-gray-500'}`}>
                Overdue
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Immunizations
            </Text>
            <TouchableOpacity className="bg-blue-600 py-2 px-4 rounded-lg flex-row items-center">
              <Ionicons name="calendar" size={18} color="white" />
              <Text className="text-white ml-1">Schedule New</Text>
            </TouchableOpacity>
          </View>

          {activeData.map((item) => (
            <TouchableOpacity 
              key={item.id}
              className={`bg-white mb-4 rounded-lg shadow-sm overflow-hidden ${
                activeTab === 'overdue' ? 'border-l-4 border-red-500' : 
                activeTab === 'upcoming' && item.dueDate === 'Today' ? 'border-l-4 border-yellow-500' : ''
              }`}
            >
              <View className="p-4">
                <View className="flex-row justify-between items-start">
                  <View className="flex-row items-center">
                    <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                      activeTab === 'completed' ? 'bg-green-100' :
                      activeTab === 'overdue' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <Ionicons 
                        name={
                          activeTab === 'completed' ? 'checkmark' :
                          activeTab === 'overdue' ? 'alert' : 'calendar'
                        } 
                        size={18} 
                        color={
                          activeTab === 'completed' ? '#10b981' :
                          activeTab === 'overdue' ? '#ef4444' : '#3b82f6'
                        } 
                      />
                    </View>
                    <View>
                      <Text className="text-gray-800 font-medium">{item.name}</Text>
                      <Text className="text-gray-500 text-sm">{item.age}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className={`font-medium ${
                      activeTab === 'completed' ? 'text-green-600' :
                      activeTab === 'overdue' ? 'text-red-600' : 
                      item.dueDate === 'Today' ? 'text-yellow-600' : 'text-blue-600'
                    }`}>
                      {activeTab === 'upcoming' ? item.dueDate :
                       activeTab === 'completed' ? item.completedDate :
                       `Overdue by ${item.overdueBy}`}
                    </Text>
                  </View>
                </View>
                
                <View className="mt-3 p-2 bg-gray-50 rounded-lg">
                  <Text className="text-gray-800">
                    <Text className="font-medium">Vaccines: </Text>{item.vaccine}
                  </Text>
                </View>
                
                <View className="flex-row mt-3 justify-between">
                  <View>
                    <Text className="text-xs text-gray-500">Parent/Guardian</Text>
                    <Text className="text-gray-700">{item.parentName}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs text-gray-500">Contact</Text>
                    <Text className="text-gray-700">{item.contact}</Text>
                  </View>
                </View>
              </View>
              
              <View className="flex-row border-t border-gray-100">
                {activeTab === 'upcoming' && (
                  <>
                    <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                      <Ionicons name="checkmark-circle-outline" size={16} color="#10b981" />
                      <Text className="text-green-600 ml-1">Mark Complete</Text>
                    </TouchableOpacity>
                    <View className="w-[1px] bg-gray-100" />
                  </>
                )}
                {activeTab === 'overdue' && (
                  <>
                    <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                      <Ionicons name="calendar-outline" size={16} color="#3b82f6" />
                      <Text className="text-blue-600 ml-1">Reschedule</Text>
                    </TouchableOpacity>
                    <View className="w-[1px] bg-gray-100" />
                  </>
                )}
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="call-outline" size={16} color="#4f46e5" />
                  <Text className="text-indigo-600 ml-1">Call</Text>
                </TouchableOpacity>
                <View className="w-[1px] bg-gray-100" />
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="ellipsis-horizontal" size={16} color="#4b5563" />
                  <Text className="text-gray-600 ml-1">More</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          
          {activeData.length === 0 && (
            <View className="items-center justify-center p-8">
              <Ionicons 
                name={
                  searchQuery ? "search" : 
                  activeTab === 'completed' ? "checkmark-circle" :
                  activeTab === 'overdue' ? "alert-circle" : "calendar"
                } 
                size={48} 
                color="#d1d5db" 
              />
              <Text className="text-gray-500 mt-4 text-center">
                {searchQuery 
                  ? "No immunization records found matching your search."
                  : `No ${activeTab} immunizations at the moment.`
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
} 