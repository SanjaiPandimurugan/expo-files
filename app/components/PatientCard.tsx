import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PatientCardProps {
  name: string;
  age?: string | number;
  gender?: 'male' | 'female' | 'other';
  diagnosis?: string;
  status?: 'normal' | 'high' | 'medium' | 'critical';
  lastVisit?: string;
  nextVisit?: string;
  village?: string;
  onPress?: () => void;
  onCallPress?: () => void;
  additionalInfo?: { label: string; value: string | number }[];
  actions?: { icon: string; label: string; color: string; onPress: () => void }[];
  colorScheme?: 'primary' | 'purple' | 'pink' | 'green' | 'blue';
}

export default function PatientCard({
  name,
  age,
  gender,
  diagnosis,
  status = 'normal',
  lastVisit,
  nextVisit,
  village,
  onPress,
  onCallPress,
  additionalInfo = [],
  actions = [],
  colorScheme = 'primary'
}: PatientCardProps) {
  // Color mapping based on colorScheme
  const colorMap = {
    primary: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
      border: 'border-indigo-100'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-100'
    },
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-600',
      border: 'border-pink-100'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-100'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-100'
    }
  };

  // Status color mapping
  const statusColorMap = {
    normal: { bg: 'bg-green-500', text: 'text-green-600' },
    medium: { bg: 'bg-yellow-500', text: 'text-yellow-600' },
    high: { bg: 'bg-red-500', text: 'text-red-600' },
    critical: { bg: 'bg-red-600', text: 'text-red-700' }
  };

  const colors = colorMap[colorScheme];
  const statusColors = statusColorMap[status];

  return (
    <TouchableOpacity 
      className="bg-white mb-4 rounded-lg shadow-sm overflow-hidden"
      onPress={onPress}
    >
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-row items-center">
            <View className={`${colors.bg} w-10 h-10 rounded-full items-center justify-center mr-3`}>
              <Text className={`${colors.text} font-bold`}>{name.charAt(0)}</Text>
            </View>
            <View>
              <Text className="text-gray-800 font-medium">{name}</Text>
              <Text className="text-gray-500 text-sm">
                {age && `${age} years`}
                {age && gender && ' • '}
                {gender && `${gender.charAt(0).toUpperCase() + gender.slice(1)}`}
                {(age || gender) && village && ' • '}
                {village && `${village}`}
              </Text>
            </View>
          </View>

          {onCallPress && (
            <TouchableOpacity 
              className="bg-gray-100 p-2 rounded-full"
              onPress={onCallPress}
            >
              <Ionicons name="call" size={18} color="#4b5563" />
            </TouchableOpacity>
          )}
        </View>
        
        {diagnosis && (
          <View className="mt-3 p-2 bg-gray-50 rounded-lg">
            <Text className="text-gray-800">
              <Text className="font-medium">Diagnosis: </Text>{diagnosis}
            </Text>
          </View>
        )}
        
        {additionalInfo.length > 0 && (
          <View className="flex-row mt-3 flex-wrap">
            {additionalInfo.map((info, index) => (
              <View key={index} className="mr-4 mb-2">
                <Text className="text-xs text-gray-500">{info.label}</Text>
                <Text className="text-gray-700">{info.value}</Text>
              </View>
            ))}
          </View>
        )}

        {(lastVisit || nextVisit || status !== 'normal') && (
          <View className="flex-row mt-3 justify-between">
            {lastVisit && (
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Last Visit</Text>
                <Text className="text-gray-700">{lastVisit}</Text>
              </View>
            )}
            
            {status !== 'normal' && (
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Risk Status</Text>
                <View className="flex-row items-center">
                  <View className={`w-2 h-2 rounded-full mr-1 ${statusColors.bg}`} />
                  <Text className={statusColors.text}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </View>
              </View>
            )}
            
            {nextVisit && (
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Next Visit</Text>
                <Text className="text-gray-700">{nextVisit}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      
      {actions.length > 0 && (
        <View className="flex-row border-t border-gray-100">
          {actions.map((action, index) => (
            <React.Fragment key={index}>
              {index > 0 && <View className="w-[1px] bg-gray-100" />}
              <TouchableOpacity 
                className="flex-1 py-3 flex-row justify-center items-center"
                onPress={action.onPress}
              >
                <Ionicons name={action.icon} size={16} color={action.color} />
                <Text style={{ color: action.color }} className="ml-1">{action.label}</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
} 