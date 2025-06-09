import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { ArrowLeft, Search, Filter, Plus, Check } from 'lucide-react-native';

export default function SubjectEnrollmentScreen() {
  const colors = getColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'JC' | 'O-Level' | 'A-Level'>('O-Level');
  const [selectedExamBoard, setSelectedExamBoard] = useState<'ZIMSEC' | 'Cambridge'>('ZIMSEC');
  const [enrolledSubjects, setEnrolledSubjects] = useState<string[]>(['mathematics', 'physics', 'chemistry']);

  // Mock subjects data
  const allSubjects = [
    { id: 'mathematics', name: 'Mathematics', icon: '📊', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Master algebra, geometry, and calculus' },
    { id: 'physics', name: 'Physics', icon: '⚛️', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Explore mechanics, waves, and electricity' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Learn about atoms, molecules, and reactions' },
    { id: 'biology', name: 'Biology', icon: '🧬', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Study life sciences and human anatomy' },
    { id: 'english', name: 'English Language', icon: '📝', level: 'O-Level', examBoard: 'Cambridge', description: 'Improve reading, writing, and communication' },
    { id: 'history', name: 'History', icon: '📚', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Explore world and African history' },
    { id: 'geography', name: 'Geography', icon: '🌍', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Study physical and human geography' },
    { id: 'accounting', name: 'Accounting', icon: '💰', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Learn financial principles and bookkeeping' },
    { id: 'economics', name: 'Economics', icon: '📈', level: 'O-Level', examBoard: 'Cambridge', description: 'Understand markets and economic principles' },
    { id: 'business', name: 'Business Studies', icon: '💼', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Learn entrepreneurship and management' },
    { id: 'computer', name: 'Computer Science', icon: '💻', level: 'O-Level', examBoard: 'Cambridge', description: 'Programming and digital literacy' },
    { id: 'art', name: 'Art & Design', icon: '🎨', level: 'O-Level', examBoard: 'ZIMSEC', description: 'Creative expression and design principles' },
  ];

  const filteredSubjects = allSubjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = subject.level === selectedLevel;
    const matchesExamBoard = subject.examBoard === selectedExamBoard;
    return matchesSearch && matchesLevel && matchesExamBoard;
  });

  const handleEnrollToggle = (subjectId: string) => {
    setEnrolledSubjects(prev => 
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Enroll in Subjects
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Search color={colors.textSecondary} size={20} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search subjects..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
          {/* Level Filter */}
          <View style={styles.filterGroup}>
            <Text style={[styles.filterLabel, { color: colors.text }]}>Level:</Text>
            {['JC', 'O-Level', 'A-Level'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.filterChip,
                  selectedLevel === level && { backgroundColor: colors.primary },
                  selectedLevel !== level && { backgroundColor: colors.surface, borderColor: colors.border }
                ]}
                onPress={() => setSelectedLevel(level as any)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedLevel === level && { color: '#ffffff' },
                    selectedLevel !== level && { color: colors.text }
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Exam Board Filter */}
          <View style={styles.filterGroup}>
            <Text style={[styles.filterLabel, { color: colors.text }]}>Exam Board:</Text>
            {['ZIMSEC', 'Cambridge'].map((board) => (
              <TouchableOpacity
                key={board}
                style={[
                  styles.filterChip,
                  selectedExamBoard === board && { backgroundColor: colors.primary },
                  selectedExamBoard !== board && { backgroundColor: colors.surface, borderColor: colors.border }
                ]}
                onPress={() => setSelectedExamBoard(board as any)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedExamBoard === board && { color: '#ffffff' },
                    selectedExamBoard !== board && { color: colors.text }
                  ]}
                >
                  {board}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Subjects List */}
      <ScrollView style={styles.subjectsList} showsVerticalScrollIndicator={false}>
        <View style={styles.subjectsGrid}>
          {filteredSubjects.map((subject) => {
            const isEnrolled = enrolledSubjects.includes(subject.id);
            
            return (
              <Card key={subject.id} style={styles.subjectCard}>
                <View style={styles.subjectContent}>
                  <View style={styles.subjectHeader}>
                    <Text style={styles.subjectIcon}>{subject.icon}</Text>
                    <View style={styles.subjectInfo}>
                      <Text style={[styles.subjectName, { color: colors.text }]}>
                        {subject.name}
                      </Text>
                      <View style={styles.subjectMeta}>
                        <Text style={[styles.levelBadge, { backgroundColor: colors.secondary + '20', color: colors.text }]}>
                          {subject.level}
                        </Text>
                        <Text style={[styles.examBoardBadge, { backgroundColor: colors.primary + '20', color: colors.primary }]}>
                          {subject.examBoard}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <Text style={[styles.subjectDescription, { color: colors.textSecondary }]}>
                    {subject.description}
                  </Text>
                  
                  <TouchableOpacity
                    style={[
                      styles.enrollButton,
                      isEnrolled 
                        ? { backgroundColor: colors.success }
                        : { backgroundColor: colors.primary }
                    ]}
                    onPress={() => handleEnrollToggle(subject.id)}
                  >
                    {isEnrolled ? (
                      <Check color="#ffffff\" size={16} />
                    ) : (
                      <Plus color="#ffffff" size={16} />
                    )}
                    <Text style={styles.enrollButtonText}>
                      {isEnrolled ? 'Enrolled' : 'Enroll'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          })}
        </View>

        {filteredSubjects.length === 0 && (
          <Card style={styles.emptyState}>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              No subjects found
            </Text>
            <Text style={[styles.emptyStateSubtitle, { color: colors.textSecondary }]}>
              Try adjusting your filters or search query
            </Text>
          </Card>
        )}
      </ScrollView>

      {/* Enrolled Count */}
      {enrolledSubjects.length > 0 && (
        <View style={[styles.enrolledCounter, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <Text style={[styles.enrolledCountText, { color: colors.text }]}>
            {enrolledSubjects.length} subject{enrolledSubjects.length !== 1 ? 's' : ''} enrolled
          </Text>
          <Button
            title="Continue"
            onPress={() => router.back()}
            size="small"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginLeft: 16,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 24,
    gap: 20,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  subjectsList: {
    flex: 1,
  },
  subjectsGrid: {
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 24,
  },
  subjectCard: {
    padding: 20,
  },
  subjectContent: {
    gap: 12,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  subjectMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  levelBadge: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  examBoardBadge: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  subjectDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  enrollButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  emptyState: {
    marginHorizontal: 24,
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  enrolledCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  enrolledCountText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});