import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AnmDashboard() {
  const appointments = [
    { name: 'Sunita Devi', type: 'Antenatal Checkup', time: '9:30 AM' },
    { name: 'Baby Arjun', type: 'Vaccination', time: '10:15 AM' },
    { name: 'Priya Singh', type: 'Post-natal Care', time: '11:00 AM' },
    { name: 'Meena Kumari', type: 'Health Checkup', time: '12:30 PM' },
  ];

  const metrics = [
    { label: 'Vaccinations', count: 24, icon: 'medical', color: '#1d4ed8' },
    { label: 'Consultations', count: 18, icon: 'people', color: '#7e22ce' },
    { label: 'Deliveries', count: 5, icon: 'heart', color: '#ec4899' },
    { label: 'Home Visits', count: 12, icon: 'home', color: '#10b981' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'ANM Dashboard',
        }}
      />
      <ScrollView className="flex-1 bg-slate-50">
        <View className="p-4 bg-purple-700">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white text-lg">Welcome back,</Text>
              <Text className="text-white text-2xl font-bold">Kavita</Text>
            </View>
            <TouchableOpacity className="bg-white/20 p-2 rounded-full">
              <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <Text className="text-gray-800 font-semibold mb-3">This Month's Performance</Text>
            <View className="flex-row justify-between">
              {metrics.map((metric, index) => (
                <View key={index} className="items-center">
                  <View 
                    className={`w-12 h-12 rounded-full items-center justify-center mb-1`}
                    style={{ backgroundColor: `${metric.color}30` }}
                  >
                    <Ionicons name={metric.icon} size={20} color={metric.color} />
                  </View>
                  <Text className="text-2xl font-bold text-gray-800">{metric.count}</Text>
                  <Text className="text-xs text-gray-500">{metric.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Today's Schedule</Text>
            <Link href="/screens/anm/schedule" asChild>
              <TouchableOpacity>
                <Text className="text-purple-600">Full Schedule</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          {appointments.map((appointment, index) => (
            <View key={index} className="mb-3 p-4 bg-white rounded-lg shadow-sm">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <View className="bg-purple-100 w-10 h-10 rounded-full items-center justify-center mr-3">
                    <Text className="text-purple-600 font-bold">
                      {appointment.name.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-800 font-medium">{appointment.name}</Text>
                    <Text className="text-gray-500 text-sm">{appointment.type}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-purple-600 font-medium">{appointment.time}</Text>
                  <TouchableOpacity>
                    <Text className="text-xs text-gray-500">Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View className="mt-6">
            <Text className="text-xl font-semibold text-gray-800 mb-4">Services</Text>
            <View className="flex-row flex-wrap justify-between">
              <Link href="/screens/anm/anc" asChild>
                <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
                  <View className="bg-pink-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="woman" size={20} color="#ec4899" />
                  </View>
                  <Text className="text-gray-800 font-medium">Antenatal Care</Text>
                  <Text className="text-xs text-gray-500 mt-1">Checkups & counseling</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/screens/anm/immunization" asChild>
                <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
                  <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="medical" size={20} color="#3b82f6" />
                  </View>
                  <Text className="text-gray-800 font-medium">Immunization</Text>
                  <Text className="text-xs text-gray-500 mt-1">Vaccines & records</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/screens/anm/delivery" asChild>
                <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
                  <View className="bg-purple-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="heart" size={20} color="#8b5cf6" />
                  </View>
                  <Text className="text-gray-800 font-medium">Delivery Care</Text>
                  <Text className="text-xs text-gray-500 mt-1">Delivery preparation</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/screens/anm/pnc" asChild>
                <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
                  <View className="bg-green-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="home" size={20} color="#10b981" />
                  </View>
                  <Text className="text-gray-800 font-medium">Post Natal Care</Text>
                  <Text className="text-xs text-gray-500 mt-1">Mother & infant care</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <View className="mt-2 bg-purple-50 p-4 rounded-lg border border-purple-100 mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-purple-800 font-medium mb-1">Medical Inventory</Text>
                <Text className="text-purple-600 text-sm">Check and manage medicines, equipment & supplies</Text>
              </View>
              <Link href="/screens/anm/inventory" asChild>
                <TouchableOpacity className="bg-purple-600 p-2 rounded-lg">
                  <Ionicons name="arrow-forward" size={18} color="white" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
} 