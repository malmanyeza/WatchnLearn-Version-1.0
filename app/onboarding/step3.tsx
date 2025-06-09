import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { GraduationCap, ChevronLeft } from 'lucide-react-native';

export default function OnboardingStep3() {
  const colors = getColors();
  const [level, setLevel] = useState<'JC' | 'O-Level' | 'A-Level' | null>(null);

  const levels = [
    {
      id: 'JC' as const,
      title: 'Junior Certificate (JC)',
      description: 'Form 1 & 2 curriculum',
    },
    {
      id: 'O-Level' as const,
      title: 'Ordinary Level',
      description: 'Form 3 & 4 curriculum',
    },
    {
      id: 'A-Level' as const,
      title: 'Advanced Level',
      description: 'Form 5 & 6 curriculum',
    },
  ];

  const handleNext = () => {
    if (level) {
      router.push('/onboarding/step4');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color={colors.text} size={24} />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <Text style={[styles.progress, { color: colors.textSecondary }]}>
            Step 3 of 4
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '75%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <GraduationCap color={colors.primary} size={48} style={styles.icon} />
        
        <Text style={[styles.title, { color: colors.text }]}>
          What's your current level?
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select your current academic level to get personalized content
        </Text>

        <View style={styles.levelContainer}>
          {levels.map((levelOption) => (
            <TouchableOpacity
              key={levelOption.id}
              style={[
                styles.levelButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
                level === levelOption.id && { borderColor: colors.primary, borderWidth: 3 }
              ]}
              onPress={() => setLevel(levelOption.id)}
            >
              <Text style={[styles.levelTitle, { color: colors.text }]}>
                {levelOption.title}
              </Text>
              <Text style={[styles.levelDescription, { color: colors.textSecondary }]}>
                {levelOption.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={handleNext}
          disabled={!level}
          size="large"
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  progressContainer: {
    flex: 1,
    marginLeft: 16,
  },
  progress: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 32,
  },
  levelContainer: {
    width: '100%',
    gap: 16,
  },
  levelButton: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    paddingVertical: 24,
  },
  button: {
    width: '100%',
  },
});