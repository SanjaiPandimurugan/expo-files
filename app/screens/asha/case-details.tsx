import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

export default function CaseDetails() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateNotes, setUpdateNotes] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  
  // Mock case data
  const caseData = {
    id: 'C004',
    name: 'Lakshmi Devi',
    age: 28,
    gender: 'Female',
    location: 'House #42, Sector 15, East Delhi',
    phone: '+91 8765432109',
    type: 'Maternal Care',
    status: 'Active',
    startDate: '05 Oct 2023',
    lastVisit: '15 Oct 2023',
    nextVisit: '25 Oct 2023',
    photo: require('../../../assets/images/icon.png'), // Using an existing image as placeholder
    medicalInfo: {
      pregnancyStage: 'Third Trimester',
      dueDate: '15 Dec 2023',
      bloodType: 'O+',
      healthIssues: ['Mild anemia', 'Previous miscarriage'],
      medications: ['Iron supplements', 'Folic acid']
    },
    history: [
      { 
        date: '15 Oct 2023', 
        type: 'Visit', 
        notes: 'Regular checkup conducted. Blood pressure normal at 120/80. Fetal heart rate normal. Patient reports mild back pain. Advised on sleeping positions and light exercises.',
        conductor: 'Anjali Sharma (ASHA)'
      },
      { 
        date: '10 Oct 2023', 
        type: 'Medication', 
        notes: 'Iron supplements and folic acid provided for next 15 days. Patient informed about proper dosage and timing.',
        conductor: 'Anjali Sharma (ASHA)'
      },
      { 
        date: '05 Oct 2023', 
        type: 'Initial Assessment', 
        notes: 'Initial pregnancy assessment done. Patient in 7th month. Found mild anemia with Hb levels at 10.2. Referred to ANM for comprehensive checkup.',
        conductor: 'Anjali Sharma (ASHA)'
      },
      { 
        date: '01 Oct 2023', 
        type: 'Registration', 
        notes: 'Case registered in the system. Patient informed about ASHA services and scheduled first visit.',
        conductor: 'System'
      }
    ]
  };
  
  // Handle case update submission
  const handleUpdateSubmit = () => {
    if (!updateNotes.trim()) {
      Alert.alert('Missing Information', 'Please enter update notes');
      return;
    }
    
    // In a real app, this would update the case in the backend
    Alert.alert(
      'Case Updated',
      'Your update has been recorded successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowUpdateModal(false);
            setUpdateNotes('');
            setSelectedRating(0);
          }
        }
      ]
    );
  };
  
  // Render star rating control
  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity 
          key={i} 
          onPress={() => setSelectedRating(i)}
          className="mx-1"
        >
          <Ionicons 
            name={i <= selectedRating ? "star" : "star-outline"} 
            size={28} 
            color={i <= selectedRating ? "#FFD700" : "#9ca3af"} 
          />
        </TouchableOpacity>
      );
    }
    return (
      <View className="flex-row justify-center my-3">
        {stars}
      </View>
    );
  };
  
  // Render details tab content
  const renderDetails = () => (
    <View>
      {/* Medical Information */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Medical Information</Text>
        <View className="bg-white p-4 rounded-lg shadow-sm">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700 font-medium">Pregnancy Stage:</Text>
            <Text className="text-gray-800">{caseData.medicalInfo.pregnancyStage}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700 font-medium">Due Date:</Text>
            <Text className="text-gray-800">{caseData.medicalInfo.dueDate}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700 font-medium">Blood Type:</Text>
            <Text className="text-gray-800">{caseData.medicalInfo.bloodType}</Text>
          </View>
          
          <Text className="text-gray-700 font-medium mt-2 mb-1">Health Issues:</Text>
          <View>
            {caseData.medicalInfo.healthIssues.map((issue, index) => (
              <View key={index} className="flex-row items-center mb-1">
                <View className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                <Text className="text-gray-800">{issue}</Text>
              </View>
            ))}
          </View>
          
          <Text className="text-gray-700 font-medium mt-2 mb-1">Current Medications:</Text>
          <View>
            {caseData.medicalInfo.medications.map((medication, index) => (
              <View key={index} className="flex-row items-center mb-1">
                <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <Text className="text-gray-800">{medication}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      {/* Visits Information */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Visits</Text>
        <View className="bg-white p-4 rounded-lg shadow-sm">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700 font-medium">Last Visit:</Text>
            <Text className="text-gray-800">{caseData.lastVisit}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-700 font-medium">Next Visit:</Text>
            <Text className="text-gray-800">{caseData.nextVisit}</Text>
          </View>
          
          <TouchableOpacity 
            className="bg-indigo-100 p-3 rounded-lg flex-row justify-between items-center mt-2"
            onPress={() => setShowUpdateModal(true)}
          >
            <Text className="text-indigo-700 font-medium">Schedule New Visit</Text>
            <Ionicons name="calendar" size={20} color="#4f46e5" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Actions */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Actions</Text>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity className="w-[48%] bg-indigo-600 p-4 rounded-lg items-center mb-3">
            <Ionicons name="call" size={24} color="white" />
            <Text className="text-white font-medium mt-1">Call Patient</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] bg-green-600 p-4 rounded-lg items-center mb-3">
            <Ionicons name="navigate" size={24} color="white" />
            <Text className="text-white font-medium mt-1">Get Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="w-full bg-amber-500 p-4 rounded-lg items-center"
            onPress={() => setShowUpdateModal(true)}
          >
            <Ionicons name="create" size={24} color="white" />
            <Text className="text-white font-medium mt-1">Update Case</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
  // Render history tab content
  const renderHistory = () => (
    <View>
      <Text className="text-lg font-semibold text-gray-800 mb-3">Case History</Text>
      
      {caseData.history.map((entry, index) => (
        <View 
          key={index} 
          className="mb-4 bg-white p-4 rounded-lg shadow-sm"
        >
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-row items-center">
              <View className={`w-2 h-2 rounded-full mr-2 ${
                entry.type === 'Visit' ? 'bg-indigo-500' :
                entry.type === 'Medication' ? 'bg-green-500' :
                entry.type === 'Initial Assessment' ? 'bg-amber-500' : 'bg-gray-500'
              }`} />
              <Text className="font-medium text-gray-800">{entry.type}</Text>
            </View>
            <Text className="text-gray-500 text-sm">{entry.date}</Text>
          </View>
          
          <Text className="text-gray-700 mb-2">{entry.notes}</Text>
          
          <View className="flex-row items-center mt-1">
            <Ionicons name="person-outline" size={14} color="#6b7280" />
            <Text className="text-gray-600 text-xs ml-1">{entry.conductor}</Text>
          </View>
        </View>
      ))}
      
      <TouchableOpacity 
        className="bg-indigo-50 p-3 rounded-lg flex-row justify-center items-center mt-2 mb-6"
        onPress={() => setShowUpdateModal(true)}
      >
        <Ionicons name="add-circle-outline" size={20} color="#4f46e5" className="mr-2" />
        <Text className="text-indigo-700 font-medium">Add New Entry</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header 
        title="Case Details" 
        showBack={true}
        showNotification={true}
      />
      <ScrollView className="flex-1 bg-slate-50">
        {/* Patient info header */}
        <View className="bg-indigo-600 pt-4 pb-6 px-4">
          <View className="flex-row items-center">
            <View className="bg-white p-1 rounded-full mr-4">
              <Image
                source={caseData.photo}
                style={{ width: 70, height: 70, borderRadius: 35 }}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">{caseData.name}</Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-white opacity-90">{caseData.age} years • {caseData.gender}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="call-outline" size={14} color="rgba(255,255,255,0.9)" />
                <Text className="text-white opacity-90 ml-1">{caseData.phone}</Text>
              </View>
            </View>
            
            <View className={`px-3 py-1 rounded-full ${
              caseData.status === 'Active' ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Text className={`font-medium ${
                caseData.status === 'Active' ? 'text-green-700' : 'text-gray-700'
              }`}>
                {caseData.status}
              </Text>
            </View>
          </View>
          
          <View className="flex-row justify-between mt-4 bg-white/10 rounded-lg p-3">
            <View className="items-center">
              <Text className="text-white opacity-70 text-xs">Case ID</Text>
              <Text className="text-white font-medium">{caseData.id}</Text>
            </View>
            <View className="items-center">
              <Text className="text-white opacity-70 text-xs">Type</Text>
              <Text className="text-white font-medium">{caseData.type}</Text>
            </View>
            <View className="items-center">
              <Text className="text-white opacity-70 text-xs">Started</Text>
              <Text className="text-white font-medium">{caseData.startDate}</Text>
            </View>
          </View>
        </View>
        
        {/* Location */}
        <View className="bg-white mx-4 px-4 py-3 rounded-lg shadow-sm -mt-3 mb-4">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#4f46e5" />
            <Text className="text-gray-700 ml-2">{caseData.location}</Text>
          </View>
        </View>

        {/* Content tabs */}
        <View className="flex-row bg-white border-b border-gray-200">
          <TouchableOpacity 
            className={`flex-1 px-4 py-3 ${activeTab === 'details' ? 'border-b-2 border-indigo-600' : ''}`}
            onPress={() => setActiveTab('details')}
          >
            <Text 
              className={`text-center font-medium ${activeTab === 'details' ? 'text-indigo-600' : 'text-gray-600'}`}
            >
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 px-4 py-3 ${activeTab === 'history' ? 'border-b-2 border-indigo-600' : ''}`}
            onPress={() => setActiveTab('history')}
          >
            <Text 
              className={`text-center font-medium ${activeTab === 'history' ? 'text-indigo-600' : 'text-gray-600'}`}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab content */}
        <View className="p-4">
          {activeTab === 'details' ? renderDetails() : renderHistory()}
        </View>
      </ScrollView>
      
      {/* Update Modal */}
      <Modal
        visible={showUpdateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUpdateModal(false)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-xl p-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Update Case</Text>
              <TouchableOpacity onPress={() => setShowUpdateModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <Text className="font-medium text-gray-700 mb-2">Visit Notes</Text>
            <TextInput
              className="bg-gray-100 rounded-lg p-3 text-gray-800 min-h-[120px] mb-4"
              placeholder="Enter details about this visit or update"
              multiline={true}
              value={updateNotes}
              onChangeText={setUpdateNotes}
              textAlignVertical="top"
            />
            
            <Text className="font-medium text-gray-700 mb-2 text-center">Rate Patient Cooperation</Text>
            {renderStarRating()}
            
            <TouchableOpacity 
              className="bg-indigo-600 py-3 rounded-lg items-center mt-4"
              onPress={handleUpdateSubmit}
            >
              <Text className="text-white font-medium">Submit Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
} 