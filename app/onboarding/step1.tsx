import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { User } from 'lucide-react-native';

export default function OnboardingStep1() {
  const colors = getColors();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatars = ['👤', '👨‍🎓', '👩‍🎓', '🧑‍💼', '👨‍🏫', '👩‍🏫'];

  const handleNext = () => {
    if (name.trim()) {
      // Store user data (would use context/state management in real app)
      router.push('/onboarding/step2');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.progress, { color: colors.textSecondary }]}>
          Step 1 of 4
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '25%' }]} />
        </View>
      </View>

      <View style={styles.content}>
        <User color={colors.primary} size={48} style={styles.icon} />
        
        <Text style={[styles.title, { color: colors.text }]}>
          What should we call you?
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Choose your name and pick an avatar
        </Text>

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.surface, 
            borderColor: colors.border,
            color: colors.text 
          }]}
          placeholder="Enter your name"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
        />

        <Text style={[styles.avatarTitle, { color: colors.text }]}>
          Choose your avatar
        </Text>
        
        <View style={styles.avatarGrid}>
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.avatarButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
                selectedAvatar === index && { borderColor: colors.primary, borderWidth: 3 }
              ]}
              onPress={() => setSelectedAvatar(index)}
            >
              <Text style={styles.avatarEmoji}>{avatar}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={handleNext}
          disabled={!name.trim()}
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
    marginBottom: 40,
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
  avatarTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  avatarButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  footer: {
    paddingVertical: 24,
  },
  button: {
    width: '100%',
  },
});