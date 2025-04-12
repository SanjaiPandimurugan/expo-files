import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

export default function MedicineScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for medicine inventory
  const medicines = [
    {
      id: '1',
      name: 'Iron and Folic Acid Tablets',
      category: 'Supplements',
      currentStock: 154,
      unit: 'tablets',
      minRequired: 50,
      expiryDate: '30 Dec 2023',
      recentDistribution: '12 May 2023'
    },
    {
      id: '2',
      name: 'Oral Rehydration Solution (ORS)',
      category: 'Essential Medicines',
      currentStock: 38,
      unit: 'packets',
      minRequired: 30,
      expiryDate: '15 Aug 2023',
      recentDistribution: '10 May 2023'
    },
    {
      id: '3',
      name: 'Paracetamol Tablets',
      category: 'Essential Medicines',
      currentStock: 85,
      unit: 'tablets',
      minRequired: 40,
      expiryDate: '25 Oct 2023',
      recentDistribution: '05 May 2023'
    },
    {
      id: '4',
      name: 'Zinc Supplements',
      category: 'Supplements',
      currentStock: 42,
      unit: 'tablets',
      minRequired: 30,
      expiryDate: '18 Nov 2023',
      recentDistribution: '08 May 2023'
    },
    {
      id: '5',
      name: 'Antiseptic Solution',
      category: 'First Aid',
      currentStock: 12,
      unit: 'bottles',
      minRequired: 10,
      expiryDate: '20 Sep 2023',
      recentDistribution: '15 Apr 2023'
    },
    {
      id: '6',
      name: 'Contraceptive Pills',
      category: 'Family Planning',
      currentStock: 25,
      unit: 'strips',
      minRequired: 20,
      expiryDate: '30 Nov 2023',
      recentDistribution: '02 May 2023'
    },
  ];

  // Mock data for distribution history
  const distributions = [
    {
      id: '1',
      medicineName: 'Iron and Folic Acid Tablets',
      quantity: 10,
      date: '12 May 2023',
      recipient: 'Priya Sharma',
      purpose: 'Pregnancy Care',
      status: 'completed'
    },
    {
      id: '2',
      medicineName: 'Oral Rehydration Solution (ORS)',
      quantity: 5,
      date: '10 May 2023',
      recipient: 'Raj Kumar',
      purpose: 'Child Diarrhea',
      status: 'completed'
    },
    {
      id: '3',
      medicineName: 'Paracetamol Tablets',
      quantity: 15,
      date: '05 May 2023',
      recipient: 'Community Center',
      purpose: 'Health Camp',
      status: 'completed'
    },
    {
      id: '4',
      medicineName: 'Zinc Supplements',
      quantity: 8,
      date: '08 May 2023',
      recipient: 'Meena Singh',
      purpose: 'Child Health',
      status: 'completed'
    },
    {
      id: '5',
      medicineName: 'Contraceptive Pills',
      quantity: 2,
      date: '02 May 2023',
      recipient: 'Family Planning Clinic',
      purpose: 'Distribution Program',
      status: 'completed'
    },
  ];

  // Filter based on search query
  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDistributions = distributions.filter(distribution => 
    distribution.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    distribution.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    distribution.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Various inventory stats
  const lowStockCount = medicines.filter(m => m.currentStock <= m.minRequired).length;
  const expiringCount = medicines.filter(m => {
    const expiryDate = new Date(m.expiryDate.split(' ').reverse().join(' '));
    const currentDate = new Date();
    const timeDiff = expiryDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 30;
  }).length;

  // Handle distribute medicine
  const handleDistribute = (medicine) => {
    Alert.alert(
      'Distribute Medicine',
      `Record distribution of ${medicine.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Proceed',
          onPress: () => {
            // In a real app, this would navigate to a distribution form
            Alert.alert('Success', 'Distribution form would open here');
          }
        }
      ]
    );
  };

  // Handle restock request
  const handleRestock = (medicine) => {
    Alert.alert(
      'Request Restock',
      `Request restock for ${medicine.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => {
            // In a real app, this would create a restock request
            Alert.alert('Success', 'Restock request sent to ANM');
          }
        }
      ]
    );
  };
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header 
        title="Medicine Inventory" 
        showBack={true}
        showNotification={true}
        bgColor="#10b981"
      />
      <ScrollView className="flex-1 bg-slate-50">
        <View className="p-4 bg-green-600">
          <View className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
            <TextInput
              className="p-4 pl-12"
              placeholder="Search medicines or distributions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View className="absolute left-4 top-4">
              <Ionicons name="search" size={20} color="#9ca3af" />
            </View>
          </View>
          
          <View className="flex-row bg-white rounded-lg overflow-hidden">
            <TouchableOpacity 
              className={`flex-1 py-3 ${activeTab === 'inventory' ? 'bg-green-100' : ''}`}
              onPress={() => setActiveTab('inventory')}
            >
              <Text className={`text-center ${activeTab === 'inventory' ? 'text-green-700 font-medium' : 'text-gray-600'}`}>Inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-3 ${activeTab === 'distribution' ? 'bg-green-100' : ''}`}
              onPress={() => setActiveTab('distribution')}
            >
              <Text className={`text-center ${activeTab === 'distribution' ? 'text-green-700 font-medium' : 'text-gray-600'}`}>Distribution</Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'inventory' ? (
          <View className="p-4">
            <View className="flex-row justify-between mb-4">
              <View className="bg-white p-3 rounded-lg shadow-sm w-[48%]">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-500 text-sm">Low Stock</Text>
                  <View className="bg-red-100 w-8 h-8 rounded-full items-center justify-center">
                    <Ionicons name="alert-circle" size={18} color="#ef4444" />
                  </View>
                </View>
                <Text className="text-2xl font-bold text-gray-800 mt-1">{lowStockCount} items</Text>
              </View>
              
              <View className="bg-white p-3 rounded-lg shadow-sm w-[48%]">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-500 text-sm">Expiring Soon</Text>
                  <View className="bg-yellow-100 w-8 h-8 rounded-full items-center justify-center">
                    <Ionicons name="time" size={18} color="#f59e0b" />
                  </View>
                </View>
                <Text className="text-2xl font-bold text-gray-800 mt-1">{expiringCount} items</Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-4 mt-2">
              <Text className="text-xl font-semibold text-gray-800">Medicine Stock</Text>
              <TouchableOpacity className="bg-green-600 py-2 px-4 rounded-lg flex-row items-center">
                <Ionicons name="add" size={18} color="white" />
                <Text className="text-white ml-1">Add New</Text>
              </TouchableOpacity>
            </View>

            {filteredMedicines.map((medicine) => (
              <View 
                key={medicine.id}
                className="bg-white mb-4 rounded-lg shadow-sm overflow-hidden"
              >
                <View className="p-4">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-gray-800 font-medium text-lg">{medicine.name}</Text>
                      <View className="flex-row items-center mt-1">
                        <View className="px-2 py-1 rounded-full bg-gray-100">
                          <Text className="text-xs font-medium text-gray-600">{medicine.category}</Text>
                        </View>
                      </View>
                    </View>
                    <View 
                      className={`px-3 py-1 rounded-full ${
                        medicine.currentStock <= medicine.minRequired ? 'bg-red-100' : 'bg-green-100'
                      }`}
                    >
                      <Text 
                        className={`text-xs font-medium ${
                          medicine.currentStock <= medicine.minRequired ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {medicine.currentStock <= medicine.minRequired ? 'Low Stock' : 'In Stock'}
                      </Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between mt-4">
                    <View>
                      <Text className="text-xs text-gray-500">Current Stock</Text>
                      <Text className="text-gray-800 font-medium">{medicine.currentStock} {medicine.unit}</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">Min. Required</Text>
                      <Text className="text-gray-800 font-medium">{medicine.minRequired} {medicine.unit}</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">Expiry Date</Text>
                      <Text className="text-gray-800 font-medium">{medicine.expiryDate}</Text>
                    </View>
                  </View>
                  
                  <Text className="text-xs text-gray-500 mt-2">Last distribution: {medicine.recentDistribution}</Text>
                </View>
                
                <View className="flex-row border-t border-gray-100">
                  <TouchableOpacity 
                    className="flex-1 py-3 flex-row justify-center items-center"
                    onPress={() => handleDistribute(medicine)}
                  >
                    <Ionicons name="share-outline" size={16} color="#4f46e5" />
                    <Text className="text-indigo-600 ml-1">Distribute</Text>
                  </TouchableOpacity>
                  <View className="w-[1px] bg-gray-100" />
                  <TouchableOpacity 
                    className="flex-1 py-3 flex-row justify-center items-center"
                    onPress={() => handleRestock(medicine)}
                  >
                    <Ionicons name="refresh-outline" size={16} color="#4f46e5" />
                    <Text className="text-indigo-600 ml-1">Restock</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            {filteredMedicines.length === 0 && (
              <View className="items-center justify-center p-8">
                <Ionicons name="medkit-outline" size={48} color="#d1d5db" />
                <Text className="text-gray-500 mt-4 text-center">No medicines found matching your search.</Text>
              </View>
            )}
          </View>
        ) : (
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold text-gray-800">Distribution History</Text>
              <TouchableOpacity className="bg-green-600 py-2 px-4 rounded-lg flex-row items-center">
                <Ionicons name="add" size={18} color="white" />
                <Text className="text-white ml-1">New Distribution</Text>
              </TouchableOpacity>
            </View>

            {filteredDistributions.map((dist) => (
              <View 
                key={dist.id}
                className="bg-white mb-4 rounded-lg shadow-sm overflow-hidden"
              >
                <View className="p-4">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-gray-800 font-medium">{dist.medicineName}</Text>
                      <Text className="text-gray-600 text-sm mt-1">To: {dist.recipient}</Text>
                    </View>
                    <Text className="text-gray-500 text-sm">{dist.date}</Text>
                  </View>
                  
                  <View className="flex-row justify-between mt-3">
                    <View>
                      <Text className="text-xs text-gray-500">Quantity</Text>
                      <Text className="text-gray-800 font-medium">{dist.quantity} units</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">Purpose</Text>
                      <Text className="text-gray-800 font-medium">{dist.purpose}</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500">Status</Text>
                      <Text className="text-green-600 font-medium">
                        {dist.status.charAt(0).toUpperCase() + dist.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View className="flex-row border-t border-gray-100">
                  <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                    <Ionicons name="document-text-outline" size={16} color="#4f46e5" />
                    <Text className="text-indigo-600 ml-1">View Details</Text>
                  </TouchableOpacity>
                  <View className="w-[1px] bg-gray-100" />
                  <TouchableOpacity className="flex-1 py-3 flex-row justify-center items-center">
                    <Ionicons name="copy-outline" size={16} color="#4f46e5" />
                    <Text className="text-indigo-600 ml-1">Duplicate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            {filteredDistributions.length === 0 && (
              <View className="items-center justify-center p-8">
                <Ionicons name="document-text-outline" size={48} color="#d1d5db" />
                <Text className="text-gray-500 mt-4 text-center">No distribution records found matching your search.</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
} 