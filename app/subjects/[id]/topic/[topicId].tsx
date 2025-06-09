import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { ArrowLeft, Play, FileText, Download, CircleCheck as CheckCircle, ChevronLeft, ChevronRight, Bot } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function TopicScreen() {
  const colors = getColors();
  const { id, topicId } = useLocalSearchParams();
  const [completed, setCompleted] = useState(false);

  // Mock topic data
  const topic = {
    id: topicId,
    title: 'Introduction to Quadratic Equations',
    type: 'video',
    duration: '12 min',
    description: 'Learn the basics of quadratic equations, their standard form, and how to identify them.',
    videoUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    transcript: `In this lesson, we'll explore quadratic equations, which are polynomial equations of degree 2.

A quadratic equation has the general form: ax² + bx + c = 0

Where:
- a, b, and c are constants
- a ≠ 0 (if a = 0, it becomes a linear equation)
- x is the variable

Examples of quadratic equations:
- x² + 5x + 6 = 0
- 2x² - 3x + 1 = 0
- x² - 4 = 0

Key characteristics:
1. The highest power of the variable is 2
2. The graph is a parabola
3. Can have 0, 1, or 2 real solutions`,
    nextTopic: {
      id: '2',
      title: 'Factoring Quadratics'
    },
    previousTopic: null,
  };

  const handleMarkComplete = () => {
    setCompleted(true);
    // In a real app, this would update the backend
  };

  const handleNext = () => {
    if (topic.nextTopic) {
      router.push(`/subjects/${id}/topic/${topic.nextTopic.id}`);
    }
  };

  const handlePrevious = () => {
    if (topic.previousTopic) {
      router.push(`/subjects/${id}/topic/${topic.previousTopic.id}`);
    }
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
          <Text style={[styles.topicTitle, { color: colors.text }]}>
            {topic.title}
          </Text>
          <View style={styles.topicMeta}>
            {topic.type === 'video' ? (
              <Play color={colors.primary} size={16} />
            ) : (
              <FileText color={colors.warning} size={16} />
            )}
            <Text style={[styles.duration, { color: colors.textSecondary }]}>
              {topic.duration}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.aiButton}
          onPress={() => router.push(`/subjects/${id}/ai-assistant?topic=${topicId}`)}
        >
          <Bot color={colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video/Content Player */}
        <Card style={styles.playerCard}>
          <View style={[styles.videoPlayer, { backgroundColor: colors.neutral }]}>
            <View style={styles.playButton}>
              <Play color="#ffffff" size={48} />
            </View>
            <Text style={styles.videoPlaceholder}>Video Player</Text>
          </View>
          
          <View style={styles.playerControls}>
            <TouchableOpacity style={styles.downloadButton}>
              <Download color={colors.primary} size={20} />
              <Text style={[styles.downloadText, { color: colors.primary }]}>
                Download for offline
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Description */}
        <Card style={styles.descriptionCard}>
          <Text style={[styles.descriptionTitle, { color: colors.text }]}>
            About this topic
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {topic.description}
          </Text>
        </Card>

        {/* Transcript/Notes */}
        <Card style={styles.transcriptCard}>
          <Text style={[styles.transcriptTitle, { color: colors.text }]}>
            Lesson Notes
          </Text>
          <ScrollView style={styles.transcriptScroll} nestedScrollEnabled>
            <Text style={[styles.transcript, { color: colors.text }]}>
              {topic.transcript}
            </Text>
          </ScrollView>
        </Card>

        {/* Mark Complete */}
        <Card style={styles.completeCard}>
          <View style={styles.completeContent}>
            <CheckCircle 
              color={completed ? colors.success : colors.neutral} 
              size={24} 
            />
            <View style={styles.completeText}>
              <Text style={[styles.completeTitle, { color: colors.text }]}>
                Mark as Complete
              </Text>
              <Text style={[styles.completeDescription, { color: colors.textSecondary }]}>
                {completed 
                  ? "Great job! You've completed this topic."
                  : "Mark this topic as complete to track your progress."
                }
              </Text>
            </View>
          </View>
          
          {!completed && (
            <Button
              title="Mark Complete"
              onPress={handleMarkComplete}
              size="small"
            />
          )}
        </Card>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.navButton, !topic.previousTopic && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={!topic.previousTopic}
        >
          <ChevronLeft 
            color={topic.previousTopic ? colors.primary : colors.neutral} 
            size={20} 
          />
          <Text style={[
            styles.navButtonText, 
            { color: topic.previousTopic ? colors.primary : colors.neutral }
          ]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, !topic.nextTopic && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={!topic.nextTopic}
        >
          <Text style={[
            styles.navButtonText, 
            { color: topic.nextTopic ? colors.primary : colors.neutral }
          ]}>
            Next
          </Text>
          <ChevronRight 
            color={topic.nextTopic ? colors.primary : colors.neutral} 
            size={20} 
          />
        </TouchableOpacity>
      </View>
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
  topicTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  aiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  playerCard: {
    padding: 0,
    marginBottom: 16,
    overflow: 'hidden',
  },
  videoPlayer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlaceholder: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  playerControls: {
    padding: 16,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  downloadText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  descriptionCard: {
    padding: 20,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  transcriptCard: {
    padding: 20,
    marginBottom: 16,
  },
  transcriptTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  transcriptScroll: {
    maxHeight: 200,
  },
  transcript: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  completeCard: {
    padding: 20,
    marginBottom: 24,
  },
  completeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  completeText: {
    marginLeft: 12,
    flex: 1,
  },
  completeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  completeDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});