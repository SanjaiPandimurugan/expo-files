import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'full' | 'icon-only' | 'text-only';
  showBackground?: boolean;
  backgroundColorClass?: string;
  textColorClass?: string;
}

/**
 * A reusable Logo component for consistent branding across the app
 * Uses SVG for high-quality scalable graphics
 */
export default function Logo({
  size = 'medium',
  variant = 'full',
  showBackground = true,
  backgroundColorClass = 'bg-indigo-600',
  textColorClass = 'text-white'
}: LogoProps) {
  // Size mappings for the logo container
  const containerSizes = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  // Size mappings for the logo image/SVG
  const svgSizes = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 80, height: 80 },
  };

  // Size mappings for the text
  const textSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  // Colors for the SVG elements based on background
  const primaryColor = backgroundColorClass === 'bg-white' ? '#4f46e5' : '#ffffff';
  const secondaryColor = backgroundColorClass === 'bg-white' ? '#10b981' : '#a5f3fc';
  
  // Custom VitaWave logo SVG
  const LogoSvg = () => (
    <Svg
      width={svgSizes[size].width}
      height={svgSizes[size].height}
      viewBox="0 0 100 100"
    >
      {/* Heartbeat line */}
      <Path
        d="M10,50 L30,50 L40,30 L50,70 L60,30 L70,50 L90,50"
        stroke={secondaryColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Wave element */}
      <Path
        d="M15,65 C25,55 35,75 45,65 C55,55 65,75 75,65 C85,55 95,65 95,65"
        stroke={primaryColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Letter V stylized */}
      <Path
        d="M30,25 L50,45 L70,25"
        stroke={primaryColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );

  // Render the icon-only variant
  if (variant === 'icon-only') {
    return (
      <View className={`${showBackground ? `${containerSizes[size]} ${backgroundColorClass} rounded-full items-center justify-center shadow-md` : ''}`}>
        <LogoSvg />
      </View>
    );
  }

  // Render the text-only variant
  if (variant === 'text-only') {
    return (
      <Text className={`font-bold ${textSizes[size]} ${textColorClass}`}>
        VitaWave
      </Text>
    );
  }

  // Render the full logo (icon + text)
  return (
    <View className="items-center">
      <View className={`${containerSizes[size]} ${backgroundColorClass} rounded-full items-center justify-center mb-2 shadow-md`}>
        <LogoSvg />
      </View>
      <Text className={`font-bold ${textSizes[size]} ${textColorClass}`}>
        VitaWave
      </Text>
    </View>
  );
} 