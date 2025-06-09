import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { BookOpen, ChevronLeft, Check } from 'lucide-react-native';

export default function OnboardingStep4() {
  const colors = getColors();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: '📊' },
    { id: 'english', name: 'English Language', icon: '📝' },
    { id: 'physics', name: 'Physics', icon: '⚛️' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
    { id: 'biology', name: 'Biology', icon: '🧬' },
    { id: 'history', name: 'History', icon: '📚' },
    { id: 'geography', name: 'Geography', icon: '🌍' },
    { id: 'accounting', name: 'Accounting', icon: '💰' },
    { id: 'economics', name: 'Economics', icon: '📈' },
    { id: 'business', name: 'Business Studies', icon: '💼' },
    { id: 'computer', name: 'Computer Science', icon: '💻' },
    { id: 'art', name: 'Art & Design', icon: '🎨' },
  ];

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleFinish = () => {
    if (selectedSubjects.length > 0) {
      // Store user preferences and navigate to main app
      router.replace('/(tabs)');
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
            Step 4 of 4
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '100%' }]} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <BookOpen color={colors.primary} size={48} style={styles.icon} />
        
        <Text style={[styles.title, { color: colors.text }]}>
          Choose your subjects
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select the subjects you're studying. You can change these later.
        </Text>

        <View style={styles.subjectsGrid}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[
                styles.subjectButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
                selectedSubjects.includes(subject.id) && { 
                  borderColor: colors.primary, 
                  borderWidth: 2,
                  backgroundColor: colors.primary + '10'
                }
              ]}
              onPress={() => toggleSubject(subject.id)}
            >
              <View style={styles.subjectContent}>
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
                <Text style={[styles.subjectName, { color: colors.text }]}>
                  {subject.name}
                </Text>
              </View>
              
              {selectedSubjects.includes(subject.id) && (
                <Check color={colors.primary} size={20} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.selectedCount, { color: colors.textSecondary }]}>
          {selectedSubjects.length} subject{selectedSubjects.length !== 1 ? 's' : ''} selected
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Start Learning"
          onPress={handleFinish}
          disabled={selectedSubjects.length === 0}
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
  subjectsGrid: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  subjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  subjectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subjectIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  subjectName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  selectedCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 24,
  },
  button: {
    width: '100%',
  },
});