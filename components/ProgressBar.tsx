import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getColors } from '@/constants/colors';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  isDark?: boolean;
}

export function ProgressBar({ progress, height = 8, isDark = false }: ProgressBarProps) {
  const colors = getColors(isDark);
  
  return (
    <View style={[styles.container, { height, backgroundColor: colors.neutral }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${Math.min(100, Math.max(0, progress))}%`,
            backgroundColor: colors.success,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});