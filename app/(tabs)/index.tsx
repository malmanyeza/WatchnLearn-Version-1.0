import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { getColors } from '@/constants/colors';
import { Search, Bell, Download, Plus, BookOpen, Play, FileText } from 'lucide-react-native';

export default function HomeScreen() {
  const colors = getColors();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - would come from state management/API
  const enrolledSubjects = [
    {
      id: '1',
      name: 'Mathematics',
      level: 'O-Level',
      examBoard: 'ZIMSEC',
      progress: 65,
      icon: '📊',
      nextTopic: 'Quadratic Equations',
    },
    {
      id: '2',
      name: 'Physics',
      level: 'O-Level',
      examBoard: 'ZIMSEC',
      progress: 42,
      icon: '⚛️',
      nextTopic: 'Wave Motion',
    },
    {
      id: '3',
      name: 'Chemistry',
      level: 'O-Level',
      examBoard: 'ZIMSEC',
      progress: 78,
      icon: '🧪',
      nextTopic: 'Organic Chemistry',
    },
  ];

  const recentActivity = [
    { id: '1', type: 'video', title: 'Introduction to Calculus', subject: 'Mathematics', duration: '12 min' },
    { id: '2', type: 'quiz', title: 'Chemical Bonding Quiz', subject: 'Chemistry', score: '8/10' },
    { id: '3', type: 'pdf', title: 'Physics Formula Sheet', subject: 'Physics', pages: '3 pages' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play color={colors.primary} size={16} />;
      case 'quiz': return <FileText color={colors.success} size={16} />;
      case 'pdf': return <FileText color={colors.warning} size={16} />;
      default: return <BookOpen color={colors.textSecondary} size={16} />;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Good morning,
          </Text>
          <Text style={[styles.userName, { color: colors.text }]}>
            Tendai! 👋
          </Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]}>
            <Bell color={colors.text} size={20} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.surface }]}
            onPress={() => router.push('/(tabs)/downloads')}
          >
            <Download color={colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Search color={colors.textSecondary} size={20} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search subjects, topics..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Welcome Banner */}
      <Card style={[styles.welcomeBanner, { backgroundColor: colors.primary }]}>
        <Text style={styles.bannerTitle}>Ready to learn today?</Text>
        <Text style={styles.bannerSubtitle}>
          Continue where you left off or explore new subjects
        </Text>
      </Card>

      {/* My Subjects */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            My Subjects
          </Text>
          <TouchableOpacity onPress={() => router.push('/subjects/enrollment')}>
            <Plus color={colors.primary} size={24} />
          </TouchableOpacity>
        </View>

        {enrolledSubjects.map((subject) => (
          <Card key={subject.id} style={styles.subjectCard}>
            <TouchableOpacity
              style={styles.subjectContent}
              onPress={() => router.push(`/subjects/${subject.id}`)}
            >
              <View style={styles.subjectHeader}>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectIcon}>{subject.icon}</Text>
                  <View>
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
                
                <Text style={[styles.progressText, { color: colors.success }]}>
                  {subject.progress}%
                </Text>
              </View>
              
              <ProgressBar progress={subject.progress} />
              
              <View style={styles.subjectFooter}>
                <Text style={[styles.nextTopic, { color: colors.textSecondary }]}>
                  Next: {subject.nextTopic}
                </Text>
                <Button
                  title="Continue"
                  onPress={() => router.push(`/subjects/${subject.id}/learn`)}
                  size="small"
                />
              </View>
            </TouchableOpacity>
          </Card>
        ))}

        {enrolledSubjects.length === 0 && (
          <Card style={styles.emptyState}>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              No subjects enrolled yet
            </Text>
            <Text style={[styles.emptyStateSubtitle, { color: colors.textSecondary }]}>
              Start your learning journey by enrolling in subjects
            </Text>
            <Button
              title="Explore Subjects"
              onPress={() => router.push('/subjects/enrollment')}
              style={styles.emptyStateButton}
            />
          </Card>
        )}
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Recent Activity
        </Text>

        <Card>
          {recentActivity.map((activity, index) => (
            <View
              key={activity.id}
              style={[
                styles.activityItem,
                index !== recentActivity.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
            >
              <View style={styles.activityIcon}>
                {getActivityIcon(activity.type)}
              </View>
              
              <View style={styles.activityContent}>
                <Text style={[styles.activityTitle, { color: colors.text }]}>
                  {activity.title}
                </Text>
                <Text style={[styles.activitySubject, { color: colors.textSecondary }]}>
                  {activity.subject}
                </Text>
              </View>
              
              <Text style={[styles.activityMeta, { color: colors.textSecondary }]}>
                {activity.duration || activity.score || activity.pages}
              </Text>
            </View>
          ))}
        </Card>
      </View>
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
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
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
  welcomeBanner: {
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 24,
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  subjectCard: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  subjectContent: {
    gap: 16,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subjectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subjectIcon: {
    fontSize: 32,
    marginRight: 16,
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
  progressText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  subjectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextTopic: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
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
    marginBottom: 20,
  },
  emptyStateButton: {
    minWidth: 160,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  activitySubject: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  activityMeta: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});