import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { User, School, Settings, Bell, Download, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight, Award, TrendingUp, Target } from 'lucide-react-native';

export default function ProfileScreen() {
  const colors = getColors();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);

  // Mock user data
  const userData = {
    name: 'Tendai Mukamuri',
    email: 'tendai.mukamuri@email.com',
    school: 'Churchill High School',
    level: 'O-Level',
    examBoard: 'ZIMSEC',
    avatar: '👨‍🎓',
    joinDate: 'January 2024',
    streak: 12,
    totalLessons: 89,
    certificates: 3,
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => {
          router.replace('/onboarding');
        }},
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Profile
        </Text>
      </View>

      {/* User Profile Card */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{userData.avatar}</Text>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {userData.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {userData.email}
            </Text>
            <View style={styles.userMeta}>
              <Text style={[styles.levelBadge, { backgroundColor: colors.secondary + '20', color: colors.text }]}>
                {userData.level}
              </Text>
              <Text style={[styles.examBoardBadge, { backgroundColor: colors.primary + '20', color: colors.primary }]}>
                {userData.examBoard}
              </Text>
            </View>
            <Text style={[styles.schoolInfo, { color: colors.textSecondary }]}>
              {userData.school} • Member since {userData.joinDate}
            </Text>
          </View>
        </View>

        <Button
          title="Edit Profile"
          onPress={() => router.push('/profile/edit')}
          variant="outline"
          size="small"
        />
      </Card>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Target color={colors.primary} size={24} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {userData.streak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Day Streak
          </Text>
        </Card>
        
        <Card style={styles.statCard}>
          <TrendingUp color={colors.success} size={24} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {userData.totalLessons}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Lessons Completed
          </Text>
        </Card>
        
        <Card style={styles.statCard}>
          <Award color={colors.secondary} size={24} />
          <Text style={[styles.statValue, { color: colors.text }]}>
            {userData.certificates}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Certificates
          </Text>
        </Card>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Settings
        </Text>

        <Card style={styles.settingsCard}>
          {/* Notification Settings */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell color={colors.primary} size={20} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Get notified about new content and reminders
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.neutral, true: colors.primary + '40' }}
              thumbColor={notifications ? colors.primary : colors.textSecondary}
            />
          </View>

          {/* Dark Mode */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon color={colors.primary} size={20} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Dark Mode
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Switch to dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.neutral, true: colors.primary + '40' }}
              thumbColor={darkMode ? colors.primary : colors.textSecondary}
            />
          </View>

          {/* Offline Sync */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Download color={colors.primary} size={20} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Auto-sync offline content
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Automatically download content for offline access
                </Text>
              </View>
            </View>
            <Switch
              value={offlineSync}
              onValueChange={setOfflineSync}
              trackColor={{ false: colors.neutral, true: colors.primary + '40' }}
              thumbColor={offlineSync ? colors.primary : colors.textSecondary}
            />
          </View>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Quick Actions
        </Text>

        <Card style={styles.actionsCard}>
          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push('/subjects/enrollment')}
          >
            <School color={colors.primary} size={20} />
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              Manage Subjects
            </Text>
            <ChevronRight color={colors.textSecondary} size={20} />
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push('/downloads')}
          >
            <Download color={colors.primary} size={20} />
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              Manage Downloads
            </Text>
            <ChevronRight color={colors.textSecondary} size={20} />
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push('/settings')}
          >
            <Settings color={colors.primary} size={20} />
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              App Settings
            </Text>
            <ChevronRight color={colors.textSecondary} size={20} />
          </TouchableOpacity>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          <TouchableOpacity 
            style={styles.actionItem}
            onPress={() => router.push('/help')}
          >
            <HelpCircle color={colors.primary} size={20} />
            <Text style={[styles.actionTitle, { color: colors.text }]}>
              Help & Support
            </Text>
            <ChevronRight color={colors.textSecondary} size={20} />
          </TouchableOpacity>
        </Card>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          style={[styles.logoutButton, { borderColor: colors.error }]}
          textStyle={{ color: colors.error }}
        />
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
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  userMeta: {
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
  schoolInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  settingsCard: {
    marginHorizontal: 24,
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  actionsCard: {
    marginHorizontal: 24,
    padding: 0,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    flex: 1,
    marginLeft: 16,
  },
  separator: {
    height: 1,
    marginLeft: 56,
  },
  logoutSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoutButton: {
    marginTop: 16,
  },
});