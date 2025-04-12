import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  TextInput,
  Modal,
  Alert,
  Platform
} from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DialogflowChatbot from '../../components/DialogflowChatbot';
import WebChatbot from '../../components/WebChatbot';

export default function SeekerDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showWebChatbot, setShowWebChatbot] = useState(false);

  // Mock data for nearby healthcare workers
  const nearbyWorkers = [
    {
      id: '1',
      name: 'Anjali Sharma',
      role: 'ASHA Worker',
      distance: '1.2 km',
      rating: 4.8,
      experience: '5 years',
      village: 'Govindpuri',
      availability: 'Available',
      image: require('../../../assets/vitawave-logo.png'),
    },
    {
      id: '2',
      name: 'Kavita Patel',
      role: 'ANM Worker',
      distance: '2.5 km',
      rating: 4.9,
      experience: '8 years',
      village: 'Mehrauli',
      availability: 'Available',
      image: require('../../../assets/vitawave-logo.png'),
    },
    {
      id: '3',
      name: 'Meena Devi',
      role: 'ASHA Worker',
      distance: '3.1 km',
      rating: 4.7,
      experience: '3 years',
      village: 'Sangam Vihar',
      availability: 'Busy till 5 PM',
      image: require('../../../assets/vitawave-logo.png'),
    },
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: '1',
      workerName: 'Kavita Patel',
      role: 'ANM Worker',
      date: 'Tomorrow',
      time: '10:30 AM',
      type: 'Prenatal Checkup',
      status: 'confirmed',
    },
    {
      id: '2',
      workerName: 'Anjali Sharma',
      role: 'ASHA Worker',
      date: '20 Apr 2023',
      time: '2:00 PM',
      type: 'Home Visit',
      status: 'pending',
    },
  ];

  // Mock data for health services
  const healthServices = [
    { 
      title: 'Maternal Health', 
      icon: 'heart', 
      color: '#ec4899',
      description: 'Pregnancy and post-natal care',
    },
    { 
      title: 'Child Health', 
      icon: 'body', 
      color: '#3b82f6',
      description: 'Immunization and growth monitoring',
    },
    { 
      title: 'General Health', 
      icon: 'medkit', 
      color: '#10b981',
      description: 'Health checkups and consultations',
    },
    { 
      title: 'Health Education', 
      icon: 'book', 
      color: '#8b5cf6',
      description: 'Information on health practices',
    },
    { 
      title: 'Chat with Assistant', 
      icon: 'chatbubbles', 
      color: '#0ea5e9',
      description: 'Get instant health guidance',
      route: '/screens/seeker/chatbot',
    },
  ];

  // Filter workers based on search
  const filteredWorkers = nearbyWorkers.filter(worker => 
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle appointment request
  const handleAppointmentRequest = () => {
    Alert.alert(
      'Appointment Requested', 
      `We've sent your appointment request to ${selectedWorker.name}. You'll be notified once they confirm.`,
      [{ text: 'OK', onPress: () => setShowAppointmentModal(false) }]
    );
  };

  // Select worker for appointment
  const openAppointmentModal = (worker: any) => {
    setSelectedWorker(worker);
    setShowAppointmentModal(true);
  };

  // Function to handle chat button press with options
  const handleChatButtonPress = () => {
    setShowChatOptions(true);
  };

  // Function to handle chatbot option selection
  const handleChatOptionSelection = (option: 'in-app' | 'browser') => {
    setShowChatOptions(false);
    
    if (option === 'in-app') {
      setShowChatbot(true);
    } else {
      setShowWebChatbot(true);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Care Seeker Dashboard',
        }}
      />
      <ScrollView className="flex-1 bg-slate-50">
        {/* Header section */}
        <View className="p-4 bg-green-600">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white text-lg">Welcome,</Text>
              <Text className="text-white text-2xl font-bold">Rahul</Text>
            </View>
            <TouchableOpacity className="bg-white/20 p-2 rounded-full">
              <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search bar */}
          <View className="bg-white rounded-lg overflow-hidden shadow-sm">
            <View className="flex-row items-center px-3 py-2">
              <Ionicons name="search" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-2 text-gray-800 py-2"
                placeholder="Search for healthcare workers..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>

        {/* Health issues quick actions */}
        <View className="p-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Health Services</Text>
          <View className="flex-row flex-wrap justify-between">
            {healthServices.map((service, index) => (
              <TouchableOpacity 
                key={index} 
                className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4"
                onPress={() => service.route ? router.push(service.route) : null}
              >
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <Ionicons name={service.icon} size={24} color={service.color} />
                </View>
                <Text className="text-gray-800 font-medium">{service.title}</Text>
                <Text className="text-xs text-gray-500 mt-1">{service.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming appointments */}
        {upcomingAppointments.length > 0 && (
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold text-gray-800">Upcoming Appointments</Text>
              <Link href="/screens/seeker/appointments" asChild>
                <TouchableOpacity>
                  <Text className="text-green-600">See All</Text>
                </TouchableOpacity>
              </Link>
            </View>
            
            {upcomingAppointments.map((appointment, index) => (
              <View 
                key={index} 
                className={`bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 ${
                  appointment.status === 'confirmed' ? 'border-green-500' : 'border-yellow-500'
                }`}
              >
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-gray-800 font-medium">{appointment.type}</Text>
                    <Text className="text-gray-600">with {appointment.workerName} ({appointment.role})</Text>
                    <View className="flex-row items-center mt-2">
                      <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                      <Text className="text-gray-500 text-sm ml-1">{appointment.date}</Text>
                      <Ionicons name="time-outline" size={14} color="#6b7280" className="ml-3" />
                      <Text className="text-gray-500 text-sm ml-1">{appointment.time}</Text>
                    </View>
                  </View>
                  <View 
                    className={`px-2 py-1 rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}
                  >
                    <Text 
                      className={`text-xs font-medium ${
                        appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                      }`}
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row mt-3 border-t border-gray-100 pt-3">
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                    <Ionicons name="calendar-outline" size={16} color="#4f46e5" />
                    <Text className="text-indigo-600 ml-1">Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center">
                    <Ionicons name="close-circle-outline" size={16} color="#ef4444" />
                    <Text className="text-red-500 ml-1">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Nearby healthcare workers */}
        <View className="p-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Nearby Healthcare Workers</Text>
          
          {filteredWorkers.map((worker, index) => (
            <View key={index} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              <View className="p-4">
                <View className="flex-row">
                  <View className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden mr-3">
                    <Image 
                      source={worker.image} 
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between">
                      <Text className="text-gray-800 font-medium">{worker.name}</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={14} color="#fbbf24" />
                        <Text className="text-gray-700 ml-1">{worker.rating}</Text>
                      </View>
                    </View>
                    <Text className="text-gray-600">{worker.role}</Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="location" size={14} color="#6b7280" />
                      <Text className="text-gray-500 text-sm ml-1">{worker.distance} away • {worker.village}</Text>
                    </View>
                    <View className="flex-row mt-1">
                      <View 
                        className={`px-2 py-0.5 rounded-full ${
                          worker.availability.includes('Available') ? 'bg-green-100' : 'bg-yellow-100'
                        }`}
                      >
                        <Text 
                          className={`text-xs ${
                            worker.availability.includes('Available') ? 'text-green-600' : 'text-yellow-600'
                          }`}
                        >
                          {worker.availability}
                        </Text>
                      </View>
                      <View className="px-2 py-0.5 rounded-full bg-gray-100 ml-2">
                        <Text className="text-xs text-gray-600">{worker.experience}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              
              <View className="flex-row border-t border-gray-100">
                <TouchableOpacity 
                  className="flex-1 py-3 flex-row justify-center items-center"
                  onPress={() => openAppointmentModal(worker)}
                >
                  <Ionicons name="calendar" size={16} color="#10b981" />
                  <Text className="text-green-600 ml-1">Request Appointment</Text>
                </TouchableOpacity>
                <View className="w-[1px] bg-gray-100" />
                <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                  <Ionicons name="call" size={16} color="#4f46e5" />
                  <Text className="text-indigo-600 ml-1">Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {filteredWorkers.length === 0 && (
            <View className="items-center justify-center p-8 bg-white rounded-lg">
              <Ionicons name="search" size={48} color="#d1d5db" />
              <Text className="text-gray-500 mt-4 text-center">
                No healthcare workers found matching your search.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Chatbot floating button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-green-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={handleChatButtonPress}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="white" />
      </TouchableOpacity>

      {/* Chat options modal */}
      <Modal
        visible={showChatOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowChatOptions(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className="bg-white rounded-xl w-full max-w-[320px] overflow-hidden">
            <View className="bg-green-50 p-4 border-b border-gray-200">
              <Text className="text-green-800 text-lg font-bold text-center">Choose Chat Option</Text>
            </View>
            
            <View className="p-4">
              <TouchableOpacity 
                className="flex-row items-center p-3 bg-green-50 rounded-lg mb-3"
                onPress={() => handleChatOptionSelection('in-app')}
              >
                <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="phone-portrait" size={20} color="#10b981" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">In-App Chat</Text>
                  <Text className="text-gray-500 text-sm">Chat without leaving the app</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="flex-row items-center p-3 bg-indigo-50 rounded-lg"
                onPress={() => handleChatOptionSelection('browser')}
              >
                <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="globe" size={20} color="#4f46e5" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">Browser Chat</Text>
                  <Text className="text-gray-500 text-sm">Open in your browser (recommended)</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              className="p-3 border-t border-gray-200 items-center"
              onPress={() => setShowChatOptions(false)}
            >
              <Text className="text-gray-500 font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Dialogflow Chatbot component */}
      <DialogflowChatbot isVisible={showChatbot} onClose={() => setShowChatbot(false)} />

      {/* Web Chatbot component */}
      {showWebChatbot && (
        <Modal
          visible={showWebChatbot}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowWebChatbot(false)}
        >
          <WebChatbot onClose={() => setShowWebChatbot(false)} />
        </Modal>
      )}

      {/* Appointment Request Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAppointmentModal}
        onRequestClose={() => setShowAppointmentModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">Request Appointment</Text>
              <TouchableOpacity onPress={() => setShowAppointmentModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            {selectedWorker && (
              <View className="mb-4">
                <View className="flex-row items-center mb-4">
                  <View className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-3">
                    <Image 
                      source={selectedWorker.image} 
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View>
                    <Text className="text-gray-800 font-medium">{selectedWorker.name}</Text>
                    <Text className="text-gray-600">{selectedWorker.role} • {selectedWorker.village}</Text>
                  </View>
                </View>
                
                <Text className="text-gray-700 font-medium mb-2">Appointment Type</Text>
                <View className="flex-row mb-4">
                  <TouchableOpacity className="flex-1 mr-2 p-3 bg-green-100 rounded-lg items-center">
                    <Ionicons name="home" size={24} color="#10b981" />
                    <Text className="text-green-700 mt-1">Home Visit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 ml-2 p-3 bg-gray-100 rounded-lg items-center">
                    <Ionicons name="business" size={24} color="#6b7280" />
                    <Text className="text-gray-700 mt-1">Center Visit</Text>
                  </TouchableOpacity>
                </View>
                
                <Text className="text-gray-700 font-medium mb-2">Preferred Date & Time</Text>
                <View className="flex-row mb-4">
                  <View className="flex-1 mr-2">
                    <TouchableOpacity className="p-3 bg-gray-100 rounded-lg flex-row items-center">
                      <Ionicons name="calendar" size={20} color="#6b7280" />
                      <Text className="text-gray-700 ml-2">Today</Text>
                      <Ionicons name="chevron-down" size={16} color="#6b7280" className="ml-auto" />
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1 ml-2">
                    <TouchableOpacity className="p-3 bg-gray-100 rounded-lg flex-row items-center">
                      <Ionicons name="time" size={20} color="#6b7280" />
                      <Text className="text-gray-700 ml-2">4:00 PM</Text>
                      <Ionicons name="chevron-down" size={16} color="#6b7280" className="ml-auto" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <Text className="text-gray-700 font-medium mb-2">Purpose</Text>
                <TextInput
                  className="p-3 bg-gray-100 rounded-lg mb-6"
                  placeholder="Tell us why you need this appointment..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
                
                <TouchableOpacity 
                  className="bg-green-600 p-4 rounded-lg items-center"
                  onPress={handleAppointmentRequest}
                >
                  <Text className="text-white font-bold">Request Appointment</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
} 