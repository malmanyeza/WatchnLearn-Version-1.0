import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { ArrowLeft, Play, FileText, CircleCheck as CheckCircle, Circle, Download, Clock, Award } from 'lucide-react-native';

export default function ChapterScreen() {
  const colors = getColors();
  const { id, chapterId } = useLocalSearchParams();

  // Mock chapter data
  const chapter = {
    id: chapterId,
    title: 'Quadratic Equations',
    description: 'Learn to solve quadratic equations using various methods including factoring, completing the square, and the quadratic formula.',
    estimatedTime: '2 hours',
    difficulty: 'Intermediate',
    topics: [
      {
        id: '1',
        title: 'Introduction to Quadratic Equations',
        type: 'video',
        duration: '12 min',
        completed: true,
        downloaded: true,
      },
      {
        id: '2',
        title: 'Factoring Quadratics',
        type: 'video',
        duration: '15 min',
        completed: true,
        downloaded: false,
      },
      {
        id: '3',
        title: 'Quadratic Formula Worksheet',
        type: 'pdf',
        pages: '3 pages',
        completed: false,
        downloaded: false,
      },
      {
        id: '4',
        title: 'Completing the Square',
        type: 'video',
        duration: '18 min',
        completed: false,
        downloaded: false,
      },
      {
        id: '5',
        title: 'Practice Problems',
        type: 'pdf',
        pages: '5 pages',
        completed: false,
        downloaded: false,
      },
    ],
    quiz: {
      id: 'quiz-1',
      title: 'Quadratic Equations Quiz',
      questions: 10,
      timeLimit: '15 min',
      unlocked: false,
    }
  };

  const completedTopics = chapter.topics.filter(t => t.completed).length;
  const progress = (completedTopics / chapter.topics.length) * 100;

  const getTopicIcon = (type: string, completed: boolean) => {
    if (type === 'video') {
      return <Play color={completed ? colors.success : colors.primary} size={20} />;
    }
    return <FileText color={completed ? colors.success : colors.warning} size={20} />;
  };

  const getStatusIcon = (completed: boolean) => {
    return completed 
      ? <CheckCircle color={colors.success} size={20} />
      : <Circle color={colors.neutral} size={20} />;
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
        
        <View style={styles.headerContent}>
          <Text style={[styles.chapterTitle, { color: colors.text }]}>
            {chapter.title}
          </Text>
          <Text style={[styles.progress, { color: colors.textSecondary }]}>
            {completedTopics}/{chapter.topics.length} topics completed
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Chapter Info */}
        <Card style={styles.infoCard}>
          <Text style={[styles.description, { color: colors.text }]}>
            {chapter.description}
          </Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Clock color={colors.primary} size={16} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {chapter.estimatedTime}
              </Text>
            </View>
            
            <View style={styles.metaItem}>
              <Award color={colors.secondary} size={16} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {chapter.difficulty}
              </Text>
            </View>
          </View>
        </Card>

        {/* Topics List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Topics
          </Text>
          
          {chapter.topics.map((topic, index) => (
            <Card key={topic.id} style={styles.topicCard}>
              <TouchableOpacity
                style={styles.topicContent}
                onPress={() => router.push(`/subjects/${id}/topic/${topic.id}`)}
              >
                <View style={styles.topicHeader}>
                  <View style={styles.topicInfo}>
                    {getTopicIcon(topic.type, topic.completed)}
                    <View style={styles.topicText}>
                      <Text style={[styles.topicTitle, { color: colors.text }]}>
                        {topic.title}
                      </Text>
                      <Text style={[styles.topicMeta, { color: colors.textSecondary }]}>
                        {topic.duration || topic.pages}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.topicActions}>
                    {topic.downloaded && (
                      <Download color={colors.success} size={16} style={styles.downloadIcon} />
                    )}
                    {getStatusIcon(topic.completed)}
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {/* Chapter Quiz */}
        <Card style={styles.quizCard}>
          <View style={styles.quizHeader}>
            <Text style={[styles.quizTitle, { color: colors.text }]}>
              Chapter Quiz
            </Text>
            {chapter.quiz.unlocked ? (
              <Text style={[styles.quizUnlocked, { color: colors.success }]}>
                Unlocked
              </Text>
            ) : (
              <Text style={[styles.quizLocked, { color: colors.warning }]}>
                Complete all topics to unlock
              </Text>
            )}
          </View>
          
          <Text style={[styles.quizDescription, { color: colors.textSecondary }]}>
            Test your understanding with {chapter.quiz.questions} questions
          </Text>
          
          <View style={styles.quizMeta}>
            <Text style={[styles.quizMetaText, { color: colors.textSecondary }]}>
              {chapter.quiz.questions} questions • {chapter.quiz.timeLimit}
            </Text>
          </View>
          
          <Button
            title={chapter.quiz.unlocked ? "Start Quiz" : "Complete Topics First"}
            onPress={() => {
              if (chapter.quiz.unlocked) {
                router.push(`/subjects/${id}/quiz/${chapter.quiz.id}`);
              }
            }}
            disabled={!chapter.quiz.unlocked}
            style={styles.quizButton}
          />
        </Card>
      </ScrollView>
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
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  chapterTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  progress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  infoCard: {
    padding: 20,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  topicCard: {
    marginBottom: 12,
    padding: 16,
  },
  topicContent: {
    gap: 12,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  topicText: {
    marginLeft: 12,
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  topicMeta: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  topicActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  downloadIcon: {
    marginRight: 4,
  },
  quizCard: {
    padding: 20,
    marginBottom: 24,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quizTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  quizUnlocked: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  quizLocked: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  quizDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 12,
  },
  quizMeta: {
    marginBottom: 16,
  },
  quizMetaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  quizButton: {
    alignSelf: 'flex-start',
  },
});