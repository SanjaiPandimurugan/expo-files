import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

export default function CounselingScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('scheduled');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for counseling sessions
  const sessions = [
    {
      id: '1',
      title: 'Nutrition during Pregnancy',
      type: 'Group',
      status: 'scheduled',
      date: '15 May 2023',
      time: '10:00 AM',
      location: 'Community Center, Sector 15',
      participants: 8,
      description: 'Session on importance of balanced diet and nutritional requirements during pregnancy.'
    },
    {
      id: '2',
      title: 'Family Planning',
      type: 'Individual',
      status: 'scheduled',
      date: '18 May 2023',
      time: '2:30 PM',
      location: 'Health Center, Sector 10',
      participants: 1,
      description: 'One-on-one counseling on family planning methods and reproductive health.'
    },
    {
      id: '3',
      title: 'Immunization Awareness',
      type: 'Group',
      status: 'completed',
      date: '10 May 2023',
      time: '11:00 AM',
      location: 'School Hall, Sector 8',
      participants: 15,
      description: 'Awareness session on importance of timely immunization for children.'
    },
    {
      id: '4',
      title: 'Adolescent Health',
      type: 'Group',
      status: 'scheduled',
      date: '22 May 2023',
      time: '4:00 PM',
      location: 'Government School, Sector 12',
      participants: 20,
      description: 'Session on adolescent health issues, hygiene, and reproductive health.'
    },
    {
      id: '5',
      title: 'Postnatal Care',
      type: 'Individual',
      status: 'completed',
      date: '5 May 2023',
      time: '9:30 AM',
      location: 'Lakshmi Devi\'s Home, Sector 15',
      participants: 1,
      description: 'Counseling on postnatal care, breastfeeding, and newborn care.'
    },
  ];

  // Filter based on search query and active tab
  const filteredSessions = sessions.filter(session => 
    (session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeTab === 'all' || session.status === activeTab)
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header 
        title="Health Counseling" 
        showBack={true}
        showNotification={true}
        bgColor="#8b5cf6"
      />
      <ScrollView className="flex-1 bg-slate-50">
        <View className="p-4 bg-purple-600">
          <View className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
            <TextInput
              className="p-4 pl-12"
              placeholder="Search counseling sessions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View className="absolute left-4 top-4">
              <Ionicons name="search" size={20} color="#9ca3af" />
            </View>
          </View>
          
          <View className="flex-row bg-white rounded-lg overflow-hidden">
            <TouchableOpacity 
              className={`flex-1 py-3 ${activeTab === 'all' ? 'bg-purple-100' : ''}`}
              onPress={() => setActiveTab('all')}
            >
              <Text className={`text-center ${activeTab === 'all' ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-3 ${activeTab === 'scheduled' ? 'bg-purple-100' : ''}`}
              onPress={() => setActiveTab('scheduled')}
            >
              <Text className={`text-center ${activeTab === 'scheduled' ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>Scheduled</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-3 ${activeTab === 'completed' ? 'bg-purple-100' : ''}`}
              onPress={() => setActiveTab('completed')}
            >
              <Text className={`text-center ${activeTab === 'completed' ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>Completed</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Counseling Sessions</Text>
            <TouchableOpacity className="bg-purple-600 py-2 px-4 rounded-lg flex-row items-center">
              <Ionicons name="add" size={18} color="white" />
              <Text className="text-white ml-1">Add New</Text>
            </TouchableOpacity>
          </View>

          {filteredSessions.map((session) => (
            <TouchableOpacity 
              key={session.id}
              className="bg-white mb-4 rounded-lg shadow-sm overflow-hidden"
            >
              <View className="p-4">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-gray-800 font-medium text-lg">{session.title}</Text>
                    <View className="flex-row items-center mt-1">
                      <View className={`px-2 py-1 rounded-full ${session.type === 'Group' ? 'bg-blue-100' : 'bg-green-100'} mr-2`}>
                        <Text className={`text-xs font-medium ${session.type === 'Group' ? 'text-blue-600' : 'text-green-600'}`}>
                          {session.type}
                        </Text>
                      </View>
                      <View className={`px-2 py-1 rounded-full ${
                        session.status === 'scheduled' ? 'bg-indigo-100' : 'bg-gray-100'
                      }`}>
                        <Text className={`text-xs font-medium ${
                          session.status === 'scheduled' ? 'text-indigo-600' : 'text-gray-600'
                        }`}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
                    <Ionicons name="ellipsis-vertical" size={18} color="#4b5563" />
                  </TouchableOpacity>
                </View>
                
                <Text className="text-gray-600 mt-2 mb-3">{session.description}</Text>
                
                <View className="flex-row mt-2">
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="calendar-outline" size={16} color="#6b7280" />
                    <Text className="text-gray-600 text-sm ml-1">{session.date}</Text>
                  </View>
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="time-outline" size={16} color="#6b7280" />
                    <Text className="text-gray-600 text-sm ml-1">{session.time}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="people-outline" size={16} color="#6b7280" />
                    <Text className="text-gray-600 text-sm ml-1">{session.participants} participant{session.participants > 1 ? 's' : ''}</Text>
                  </View>
                </View>
                
                <View className="flex-row items-center mt-2">
                  <Ionicons name="location-outline" size={16} color="#6b7280" />
                  <Text className="text-gray-600 text-sm ml-1">{session.location}</Text>
                </View>
              </View>
              
              <View className="flex-row border-t border-gray-100">
                {session.status === 'scheduled' ? (
                  <>
                    <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                      <Ionicons name="create-outline" size={16} color="#4f46e5" />
                      <Text className="text-indigo-600 ml-1">Edit</Text>
                    </TouchableOpacity>
                    <View className="w-[1px] bg-gray-100" />
                    <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                      <Ionicons name="notifications-outline" size={16} color="#4f46e5" />
                      <Text className="text-indigo-600 ml-1">Remind</Text>
                    </TouchableOpacity>
                    <View className="w-[1px] bg-gray-100" />
                    <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                      <Ionicons name="checkmark-circle-outline" size={16} color="#4f46e5" />
                      <Text className="text-indigo-600 ml-1">Complete</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                      <Ionicons name="document-text-outline" size={16} color="#4f46e5" />
                      <Text className="text-indigo-600 ml-1">View Report</Text>
                    </TouchableOpacity>
                    <View className="w-[1px] bg-gray-100" />
                    <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                      <Ionicons name="copy-outline" size={16} color="#4f46e5" />
                      <Text className="text-indigo-600 ml-1">Duplicate</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
          
          {filteredSessions.length === 0 && (
            <View className="items-center justify-center p-8">
              <Ionicons name="chatbubbles-outline" size={48} color="#d1d5db" />
              <Text className="text-gray-500 mt-4 text-center">No counseling sessions found.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
} 