import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';

export default function AshaProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for ASHA worker profile
  const profile = {
    name: 'Anjali Sharma',
    id: 'ASHA2023045',
    region: 'East Delhi',
    experience: '3 years',
    phone: '+91 9876543210',
    email: 'anjali.sharma@vitawave.org',
    rating: 4.8,
    photo: require('../../../assets/images/icon.png'), // Using an existing image as placeholder
    skills: ['Maternal Care', 'Child Health', 'First Aid', 'Counselling', 'Immunization'],
    stats: {
      totalCases: 284,
      activeCases: 32,
      casesThisMonth: 14,
      successRate: '94%',
      visitsCompleted: 426,
    },
    recentCases: [
      { id: 'C001', name: 'Priya Patel', type: 'Maternal Care', status: 'Active', date: '15 Oct 2023' },
      { id: 'C002', name: 'Meera Singh', type: 'Child Immunization', status: 'Completed', date: '12 Oct 2023' },
      { id: 'C003', name: 'Rajesh Kumar', type: 'Health Counselling', status: 'Completed', date: '10 Oct 2023' },
      { id: 'C004', name: 'Lakshmi Devi', type: 'Maternal Care', status: 'Active', date: '05 Oct 2023' },
      { id: 'C005', name: 'Arjun Reddy', type: 'Child Health', status: 'Completed', date: '01 Oct 2023' },
    ],
    certifications: [
      { name: 'ASHA Training Program', issuer: 'Ministry of Health', date: 'June 2020' },
      { name: 'COVID-19 Response Training', issuer: 'WHO', date: 'April 2021' },
      { name: 'Maternal & Child Health', issuer: 'UNICEF', date: 'January 2022' },
    ]
  };

  // Render overview tab content
  const renderOverview = () => (
    <View>
      {/* Stats cards */}
      <View className="flex-row flex-wrap justify-between mt-4">
        <View className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-4xl font-bold text-indigo-600">{profile.stats.totalCases}</Text>
          <Text className="text-gray-600 text-sm mt-1">Total Cases</Text>
        </View>
        <View className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-4xl font-bold text-green-600">{profile.stats.activeCases}</Text>
          <Text className="text-gray-600 text-sm mt-1">Active Cases</Text>
        </View>
        <View className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-4xl font-bold text-purple-600">{profile.stats.casesThisMonth}</Text>
          <Text className="text-gray-600 text-sm mt-1">Cases This Month</Text>
        </View>
        <View className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-4xl font-bold text-amber-600">{profile.stats.successRate}</Text>
          <Text className="text-gray-600 text-sm mt-1">Success Rate</Text>
        </View>
      </View>

      {/* Skills section */}
      <View className="mt-2 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Skills & Expertise</Text>
        <View className="flex-row flex-wrap">
          {profile.skills.map((skill, index) => (
            <View key={index} className="bg-indigo-100 rounded-full px-3 py-1 mr-2 mb-2">
              <Text className="text-indigo-700 text-sm">{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Certifications */}
      <View className="mt-2 mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3">Certifications</Text>
        {profile.certifications.map((cert, index) => (
          <View key={index} className="bg-white p-3 rounded-lg shadow-sm mb-3">
            <Text className="font-medium text-gray-800">{cert.name}</Text>
            <View className="flex-row justify-between mt-1">
              <Text className="text-gray-600 text-sm">{cert.issuer}</Text>
              <Text className="text-gray-500 text-sm">{cert.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // Render cases tab content
  const renderCases = () => (
    <View className="mt-4">
      <Text className="text-lg font-semibold text-gray-800 mb-3">Recent Cases</Text>
      {profile.recentCases.map((caseItem, index) => (
        <TouchableOpacity
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm mb-3"
          onPress={() => router.push('/screens/asha/case-details')}
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="font-medium text-gray-800">{caseItem.name}</Text>
              <Text className="text-gray-600 text-sm mt-1">{caseItem.type}</Text>
            </View>
            <View className="items-end">
              <View className={`px-2 py-1 rounded-full ${
                caseItem.status === 'Active' ? 'bg-green-100' : 'bg-indigo-100'
              }`}>
                <Text className={`text-xs font-medium ${
                  caseItem.status === 'Active' ? 'text-green-600' : 'text-indigo-600'
                }`}>
                  {caseItem.status}
                </Text>
              </View>
              <Text className="text-gray-500 text-xs mt-1">{caseItem.date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity 
        className="flex-row items-center justify-center bg-indigo-50 p-3 rounded-lg mt-2"
        onPress={() => router.push('/screens/asha/all-cases')}
      >
        <Text className="text-indigo-600 font-medium mr-1">View All Cases</Text>
        <Ionicons name="chevron-forward" size={16} color="#4f46e5" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header 
        title="My Profile" 
        showLogo={true}
        showNotification={true}
      />
      <ScrollView className="flex-1 bg-slate-50">
        {/* Profile header */}
        <View className="bg-indigo-600 pt-4 pb-6 px-4">
          <View className="flex-row items-center">
            <View className="bg-white p-1 rounded-full mr-4">
              <Image
                source={profile.photo}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">{profile.name}</Text>
              <Text className="text-white opacity-80">{profile.id}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="location" size={14} color="rgba(255,255,255,0.8)" />
                <Text className="text-white opacity-80 ml-1">{profile.region}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text className="text-white ml-1">{profile.rating} Rating</Text>
              </View>
            </View>
            <TouchableOpacity 
              className="bg-white/20 p-2 rounded-full"
              onPress={() => router.push('/screens/asha/edit-profile')}
            >
              <Ionicons name="create-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact info */}
        <View className="bg-white mx-4 px-4 py-3 rounded-lg shadow-sm -mt-3">
          <View className="flex-row items-center mb-2">
            <Ionicons name="call-outline" size={16} color="#4f46e5" />
            <Text className="text-gray-700 ml-2">{profile.phone}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={16} color="#4f46e5" />
            <Text className="text-gray-700 ml-2">{profile.email}</Text>
          </View>
        </View>

        {/* Profile tabs */}
        <View className="flex-row bg-white mt-4 border-b border-gray-200">
          <TouchableOpacity 
            className={`flex-1 px-4 py-3 ${activeTab === 'overview' ? 'border-b-2 border-indigo-600' : ''}`}
            onPress={() => setActiveTab('overview')}
          >
            <Text 
              className={`text-center font-medium ${activeTab === 'overview' ? 'text-indigo-600' : 'text-gray-600'}`}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 px-4 py-3 ${activeTab === 'cases' ? 'border-b-2 border-indigo-600' : ''}`}
            onPress={() => setActiveTab('cases')}
          >
            <Text 
              className={`text-center font-medium ${activeTab === 'cases' ? 'text-indigo-600' : 'text-gray-600'}`}
            >
              Cases
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab content */}
        <View className="p-4">
          {activeTab === 'overview' ? renderOverview() : renderCases()}
        </View>
      </ScrollView>
    </>
  );
} 