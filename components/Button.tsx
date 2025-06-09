import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { getColors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isDark?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  isDark = false,
}: ButtonProps) {
  const colors = getColors(isDark);
  
  const buttonStyles = [
    styles.button,
    styles[size],
    variant === 'primary' && { backgroundColor: colors.primary },
    variant === 'secondary' && { backgroundColor: colors.secondary },
    variant === 'outline' && { 
      backgroundColor: 'transparent', 
      borderWidth: 2, 
      borderColor: colors.primary 
    },
    disabled && { backgroundColor: colors.neutral, opacity: 0.6 },
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    variant === 'primary' && { color: '#ffffff' },
    variant === 'secondary' && { color: '#000000' },
    variant === 'outline' && { color: colors.primary },
    disabled && { color: colors.textSecondary },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});