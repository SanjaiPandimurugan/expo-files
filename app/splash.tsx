import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSequence,
  withDelay,
  Easing,
  FadeIn,
  ZoomIn
} from 'react-native-reanimated';
import Logo from './components/Logo';

export default function SplashScreen() {
  const router = useRouter();
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    logoOpacity.value = withTiming(1, { duration: 1000, easing: Easing.ease });
    logoScale.value = withSequence(
      withTiming(1.1, { duration: 800, easing: Easing.elastic(1) }),
      withTiming(1, { duration: 400, easing: Easing.elastic(1) })
    );
    
    // Animate text
    textOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(800, withTiming(0, { duration: 800, easing: Easing.out(Easing.exp) }));
    
    // Animate subtitle with further delay
    subtitleOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));

    // Navigate to login after delay
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }]
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textTranslateY.value }]
    };
  });
  
  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: subtitleOpacity.value,
    };
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-indigo-600 justify-center items-center p-8">
        <Animated.View style={logoAnimatedStyle} className="items-center">
          <Logo 
            size="large" 
            variant="icon-only" 
            backgroundColorClass="bg-white"
          />
        </Animated.View>
        
        <Animated.View style={textAnimatedStyle} className="items-center mt-6">
          <Text className="text-white text-4xl font-bold">VitaWave</Text>
        </Animated.View>
        
        <Animated.View style={subtitleAnimatedStyle} className="items-center mt-2">
          <Text className="text-white text-lg opacity-90 text-center">Empowering healthcare workers and communities</Text>
        </Animated.View>
      </View>
    </>
  );
} 