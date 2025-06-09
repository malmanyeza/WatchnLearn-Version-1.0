import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { getColors } from '@/constants/colors';
import { ArrowLeft, BookOpen, FileText, GraduationCap, Clock, Award, Play, Download, Bot } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SubjectDetailScreen() {
  const colors = getColors();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'learn' | 'syllabus' | 'textbooks' | 'past-papers'>('learn');

  // Mock subject data - would come from API/state management
  const subject = {
    id: '1',
    name: 'Mathematics',
    level: 'O-Level',
    examBoard: 'ZIMSEC',
    progress: 65,
    icon: '📊',
    description: 'Master mathematical concepts from basic algebra to advanced calculus',
    instructor: 'Mr. Mukamuri',
    totalChapters: 12,
    completedChapters: 8,
    totalVideos: 48,
    watchedVideos: 31,
    totalQuizzes: 24,
    completedQuizzes: 16,
    estimatedTime: '6 months',
    difficulty: 'Intermediate',
    nextTopic: 'Quadratic Equations',
    streak: 5,
  };

  const tabs = [
    { key: 'learn', label: 'Learn', icon: BookOpen },
    { key: 'syllabus', label: 'Syllabus', icon: FileText },
    { key: 'textbooks', label: 'Textbooks', icon: BookOpen },
    { key: 'past-papers', label: 'Past Papers', icon: GraduationCap },
  ];

  const stats = [
    { label: 'Chapters', value: `${subject.completedChapters}/${subject.totalChapters}`, icon: BookOpen },
    { label: 'Videos', value: `${subject.watchedVideos}/${subject.totalVideos}`, icon: Play },
    { label: 'Quizzes', value: `${subject.completedQuizzes}/${subject.totalQuizzes}`, icon: FileText },
    { label: 'Streak', value: `${subject.streak} days`, icon: Award },
  ];

  const handleTabPress = (tab: string) => {
    setActiveTab(tab as any);
    if (tab !== 'learn') {
      router.push(`/subjects/${id}/${tab}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.subjectIcon}>{subject.icon}</Text>
          <View style={styles.headerText}>
            <Text style={styles.subjectName}>{subject.name}</Text>
            <View style={styles.subjectMeta}>
              <Text style={styles.levelBadge}>{subject.level}</Text>
              <Text style={styles.examBoardBadge}>{subject.examBoard}</Text>
            </View>
            <Text style={styles.instructor}>{subject.instructor}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.aiButton}
          onPress={() => router.push(`/subjects/${id}/ai-assistant`)}
        >
          <Bot color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>

      {/* Progress Section */}
      <Card style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: colors.text }]}>
            Your Progress
          </Text>
          <Text style={[styles.progressPercentage, { color: colors.success }]}>
            {subject.progress}%
          </Text>
        </View>
        
        <ProgressBar progress={subject.progress} height={12} />
        
        <View style={styles.progressStats}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <stat.icon color={colors.primary} size={16} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && { backgroundColor: colors.primary },
                activeTab !== tab.key && { backgroundColor: colors.surface }
              ]}
              onPress={() => handleTabPress(tab.key)}
            >
              <tab.icon 
                color={activeTab === tab.key ? '#ffffff' : colors.text} 
                size={20} 
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && { color: '#ffffff' },
                  activeTab !== tab.key && { color: colors.text }
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'learn' && (
          <LearnContent subject={subject} colors={colors} />
        )}
      </ScrollView>
    </View>
  );
}

function LearnContent({ subject, colors }: { subject: any; colors: any }) {
  const terms = [
    {
      id: '1',
      title: 'Term 1: Algebra Fundamentals',
      progress: 85,
      chapters: [
        { id: '1', title: 'Basic Algebra', completed: true, topics: 8 },
        { id: '2', title: 'Linear Equations', completed: true, topics: 6 },
        { id: '3', title: 'Quadratic Equations', completed: false, topics: 10 },
      ]
    },
    {
      id: '2',
      title: 'Term 2: Geometry & Trigonometry',
      progress: 45,
      chapters: [
        { id: '4', title: 'Basic Geometry', completed: true, topics: 7 },
        { id: '5', title: 'Triangles & Circles', completed: false, topics: 9 },
        { id: '6', title: 'Trigonometry', completed: false, topics: 12 },
      ]
    },
    {
      id: '3',
      title: 'Term 3: Statistics & Probability',
      progress: 0,
      chapters: [
        { id: '7', title: 'Data Collection', completed: false, topics: 5 },
        { id: '8', title: 'Statistical Analysis', completed: false, topics: 8 },
        { id: '9', title: 'Probability', completed: false, topics: 6 },
      ]
    },
  ];

  return (
    <View style={styles.learnContent}>
      {/* Continue Learning */}
      <Card style={styles.continueCard}>
        <View style={styles.continueHeader}>
          <Clock color={colors.primary} size={24} />
          <Text style={[styles.continueTitle, { color: colors.text }]}>
            Continue Learning
          </Text>
        </View>
        
        <Text style={[styles.nextTopic, { color: colors.textSecondary }]}>
          Next: {subject.nextTopic}
        </Text>
        
        <Button
          title="Continue"
          onPress={() => router.push(`/subjects/${subject.id}/learn`)}
          style={styles.continueButton}
        />
      </Card>

      {/* Terms */}
      {terms.map((term) => (
        <Card key={term.id} style={styles.termCard}>
          <View style={styles.termHeader}>
            <Text style={[styles.termTitle, { color: colors.text }]}>
              {term.title}
            </Text>
            <Text style={[styles.termProgress, { color: colors.success }]}>
              {term.progress}%
            </Text>
          </View>
          
          <ProgressBar progress={term.progress} height={8} />
          
          <View style={styles.chaptersContainer}>
            {term.chapters.map((chapter) => (
              <TouchableOpacity
                key={chapter.id}
                style={[styles.chapterItem, { borderBottomColor: colors.border }]}
                onPress={() => router.push(`/subjects/${subject.id}/chapter/${chapter.id}`)}
              >
                <View style={styles.chapterInfo}>
                  <View style={[
                    styles.chapterStatus,
                    { backgroundColor: chapter.completed ? colors.success : colors.neutral }
                  ]}>
                    {chapter.completed && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  
                  <View style={styles.chapterText}>
                    <Text style={[styles.chapterTitle, { color: colors.text }]}>
                      {chapter.title}
                    </Text>
                    <Text style={[styles.chapterTopics, { color: colors.textSecondary }]}>
                      {chapter.topics} topics
                    </Text>
                  </View>
                </View>
                
                <View style={styles.chapterActions}>
                  {chapter.completed && (
                    <TouchableOpacity style={styles.downloadButton}>
                      <Download color={colors.primary} size={16} />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  subjectIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  subjectName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subjectMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  levelBadge: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  examBoardBadge: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  instructor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  aiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressCard: {
    marginHorizontal: 24,
    marginTop: -10,
    marginBottom: 20,
    padding: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  progressPercentage: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  tabContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  tabScrollContent: {
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
  },
  learnContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  continueCard: {
    padding: 20,
    marginBottom: 24,
  },
  continueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  continueTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 12,
  },
  nextTopic: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  continueButton: {
    alignSelf: 'flex-start',
  },
  termCard: {
    padding: 20,
    marginBottom: 16,
  },
  termHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  termTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  termProgress: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  chaptersContainer: {
    marginTop: 16,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  chapterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chapterStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  chapterText: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  chapterTopics: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  chapterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButton: {
    padding: 8,
  },
});