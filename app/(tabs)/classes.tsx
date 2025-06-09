import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { getColors } from '@/constants/colors';
import { BookOpen, Clock, Award, Filter } from 'lucide-react-native';

export default function ClassesScreen() {
  const colors = getColors();
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  // Mock data
  const enrolledClasses = [
    {
      id: '1',
      name: 'Mathematics',
      level: 'O-Level',
      examBoard: 'ZIMSEC',
      progress: 65,
      icon: '📊',
      totalChapters: 12,
      completedChapters: 8,
      totalVideos: 48,
      watchedVideos: 31,
      totalQuizzes: 24,
      completedQuizzes: 16,
      nextClass: 'Quadratic Equations',
      instructor: 'Mr. Mukamuri',
    },
    {
      id: '2',
      name: 'Physics',
      level: 'O-Level',
      examBoard: 'ZIMSEC',
      progress: 42,
      icon: '⚛️',
      totalChapters: 10,
      completedChapters: 4,
      totalVideos: 40,
      watchedVideos: 17,
      totalQuizzes: 20,
      completedQuizzes: 8,
      nextClass: 'Wave Motion',
      instructor: 'Mrs. Chigumira',
    },
    {
      id: '3',
      name: 'Chemistry',
      level: 'O-Level',
      examBoard: 'ZIMSEC',
      progress: 78,
      icon: '🧪',
      totalChapters: 8,
      completedChapters: 6,
      totalVideos: 32,
      watchedVideos: 25,
      totalQuizzes: 16,
      completedQuizzes: 12,
      nextClass: 'Organic Chemistry',
      instructor: 'Dr. Matongo',
    },
    {
      id: '4',
      name: 'English Language',
      level: 'O-Level',
      examBoard: 'Cambridge',
      progress: 90,
      icon: '📝',
      totalChapters: 6,
      completedChapters: 6,
      totalVideos: 24,
      watchedVideos: 24,
      totalQuizzes: 12,
      completedQuizzes: 12,
      nextClass: 'Completed',
      instructor: 'Ms. Nyahoda',
    },
  ];

  const filteredClasses = enrolledClasses.filter(cls => {
    if (filter === 'completed') return cls.progress >= 90;
    if (filter === 'in-progress') return cls.progress < 90 && cls.progress > 0;
    return true;
  });

  const getFilterText = (filterType: string) => {
    switch (filterType) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'All Classes';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          My Classes
        </Text>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface }]}>
          <Filter color={colors.text} size={20} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {['all', 'in-progress', 'completed'].map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterTab,
              filter === filterType && { backgroundColor: colors.primary },
              filter !== filterType && { backgroundColor: colors.surface }
            ]}
            onPress={() => setFilter(filterType as any)}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === filterType && { color: '#ffffff' },
                filter !== filterType && { color: colors.text }
              ]}
            >
              {getFilterText(filterType)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Classes List */}
      <View style={styles.classesList}>
        {filteredClasses.map((cls) => (
          <Card key={cls.id} style={styles.classCard}>
            <TouchableOpacity
              style={styles.classContent}
              onPress={() => router.push(`/subjects/${cls.id}`)}
            >
              {/* Class Header */}
              <View style={styles.classHeader}>
                <View style={styles.classInfo}>
                  <Text style={styles.classIcon}>{cls.icon}</Text>
                  <View>
                    <Text style={[styles.className, { color: colors.text }]}>
                      {cls.name}
                    </Text>
                    <View style={styles.classMeta}>
                      <Text style={[styles.levelBadge, { backgroundColor: colors.secondary + '20', color: colors.text }]}>
                        {cls.level}
                      </Text>
                      <Text style={[styles.examBoardBadge, { backgroundColor: colors.primary + '20', color: colors.primary }]}>
                        {cls.examBoard}
                      </Text>
                    </View>
                    <Text style={[styles.instructor, { color: colors.textSecondary }]}>
                      {cls.instructor}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.progressContainer}>
                  <Text style={[styles.progressText, { color: colors.success }]}>
                    {cls.progress}%
                  </Text>
                  {cls.progress >= 90 && (
                    <Award color={colors.secondary} size={20} />
                  )}
                </View>
              </View>

              {/* Progress Bar */}
              <ProgressBar progress={cls.progress} />

              {/* Class Stats */}
              <View style={styles.classStats}>
                <View style={styles.statItem}>
                  <BookOpen color={colors.primary} size={16} />
                  <Text style={[styles.statText, { color: colors.textSecondary }]}>
                    {cls.completedChapters}/{cls.totalChapters} Chapters
                  </Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>🎥</Text>
                  <Text style={[styles.statText, { color: colors.textSecondary }]}>
                    {cls.watchedVideos}/{cls.totalVideos} Videos
                  </Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>📝</Text>
                  <Text style={[styles.statText, { color: colors.textSecondary }]}>
                    {cls.completedQuizzes}/{cls.totalQuizzes} Quizzes
                  </Text>
                </View>
              </View>

              {/* Next Class */}
              <View style={styles.nextClass}>
                <Clock color={colors.textSecondary} size={16} />
                <Text style={[styles.nextClassText, { color: colors.textSecondary }]}>
                  {cls.progress >= 90 ? 'Course Completed! 🎉' : `Next: ${cls.nextClass}`}
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        ))}
      </View>

      {/* Empty State */}
      {filteredClasses.length === 0 && (
        <Card style={styles.emptyState}>
          <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
            No classes found
          </Text>
          <Text style={[styles.emptyStateSubtitle, { color: colors.textSecondary }]}>
            {filter === 'completed' 
              ? "You haven't completed any classes yet"
              : filter === 'in-progress'
              ? "No classes in progress"
              : "You haven't enrolled in any classes yet"
            }
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  classesList: {
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 24,
  },
  classCard: {
    padding: 20,
  },
  classContent: {
    gap: 16,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  classIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  className: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  classMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
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
  instructor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  progressContainer: {
    alignItems: 'center',
    gap: 4,
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  classStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: {
    fontSize: 16,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  nextClass: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextClassText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  emptyState: {
    marginHorizontal: 24,
    alignItems: 'center',
    padding: 32,
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
});