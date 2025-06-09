import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { School, ChevronLeft } from 'lucide-react-native';

export default function OnboardingStep2() {
  const colors = getColors();
  const [school, setSchool] = useState('');
  const [examBoard, setExamBoard] = useState<'ZIMSEC' | 'Cambridge' | null>(null);

  const handleNext = () => {
    if (school.trim() && examBoard) {
      router.push('/onboarding/step3');
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
            Step 2 of 4
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '50%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <School color={colors.primary} size={48} style={styles.icon} />
        
        <Text style={[styles.title, { color: colors.text }]}>
          Tell us about your school
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Which school do you attend and what exam board do you follow?
        </Text>

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.surface, 
            borderColor: colors.border,
            color: colors.text 
          }]}
          placeholder="Enter your school name"
          placeholderTextColor={colors.textSecondary}
          value={school}
          onChangeText={setSchool}
        />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Select your exam board
        </Text>
        
        <View style={styles.examBoardContainer}>
          <TouchableOpacity
            style={[
              styles.examBoardButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
              examBoard === 'ZIMSEC' && { borderColor: colors.primary, borderWidth: 3 }
            ]}
            onPress={() => setExamBoard('ZIMSEC')}
          >
            <Text style={[styles.examBoardTitle, { color: colors.text }]}>
              ZIMSEC
            </Text>
            <Text style={[styles.examBoardDescription, { color: colors.textSecondary }]}>
              Zimbabwe School Examinations Council
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.examBoardButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
              examBoard === 'Cambridge' && { borderColor: colors.primary, borderWidth: 3 }
            ]}
            onPress={() => setExamBoard('Cambridge')}
          >
            <Text style={[styles.examBoardTitle, { color: colors.text }]}>
              Cambridge
            </Text>
            <Text style={[styles.examBoardDescription, { color: colors.textSecondary }]}>
              Cambridge International Examinations
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={handleNext}
          disabled={!school.trim() || !examBoard}
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
  input: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  examBoardContainer: {
    width: '100%',
    gap: 12,
  },
  examBoardButton: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
  },
  examBoardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  examBoardDescription: {
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