import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';

const { width, height } = Dimensions.get('window');

export default function OnboardingWelcome() {
  const colors = getColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400' }}
          style={styles.illustration}
          resizeMode="contain"
        />
        
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to WatchnLearn
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your personalized learning companion for ZIMSEC and Cambridge syllabuses
        </Text>
        
        <View style={styles.features}>
          <Text style={[styles.feature, { color: colors.text }]}>
            📚 JC, O-Level & A-Level Content
          </Text>
          <Text style={[styles.feature, { color: colors.text }]}>
            🎥 Video Lessons & Study Materials
          </Text>
          <Text style={[styles.feature, { color: colors.text }]}>
            📝 Past Papers & Practice Quizzes
          </Text>
          <Text style={[styles.feature, { color: colors.text }]}>
            🤖 AI-Powered Learning Assistant
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => router.push('/onboarding/step1')}
          size="large"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
  },
  features: {
    alignSelf: 'stretch',
  },
  feature: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
  },
  button: {
    width: '100%',
  },
});