import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Logo from './Logo';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  showLogo?: boolean;
  bgColor?: string;
  rightElement?: React.ReactNode;
  onNotificationPress?: () => void;
}

export default function Header({
  title,
  showBack = true,
  showNotification = true,
  showLogo = false,
  bgColor = '#4f46e5', // Default indigo-600
  rightElement,
  onNotificationPress
}: HeaderProps) {
  const router = useRouter();

  return (
    <View 
      className="px-4 py-3 flex-row justify-between items-center" 
      style={{ backgroundColor: bgColor }}
    >
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity 
            className="mr-3"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        
        {showLogo ? (
          <View className="flex-row items-center">
            <View className="mr-2">
              <Logo 
                size="small" 
                variant="icon-only" 
                showBackground={false}
              />
            </View>
            <Text className="text-white text-lg font-bold">{title}</Text>
          </View>
        ) : (
          <Text className="text-white text-lg font-bold">{title}</Text>
        )}
      </View>
      
      <View className="flex-row items-center">
        {rightElement}
        
        {showNotification && (
          <TouchableOpacity 
            className="bg-white/20 p-2 rounded-full"
            onPress={onNotificationPress}
          >
            <Ionicons name="notifications" size={22} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
} 