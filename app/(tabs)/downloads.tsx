import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { getColors } from '@/constants/colors';
import { Download, FileText, Play, Trash2, Filter, FolderOpen } from 'lucide-react-native';

export default function DownloadsScreen() {
  const colors = getColors();
  const [filter, setFilter] = useState<'all' | 'videos' | 'pdfs'>('all');

  // Mock download data
  const downloads = [
    {
      id: '1',
      title: 'Introduction to Calculus',
      subject: 'Mathematics',
      type: 'video',
      size: '125 MB',
      downloadDate: '2024-01-15',
      duration: '12 min',
      progress: 100,
    },
    {
      id: '2',
      title: 'Chemical Bonding Summary',
      subject: 'Chemistry',
      type: 'pdf',
      size: '2.3 MB',
      downloadDate: '2024-01-14',
      pages: '8 pages',
      progress: 100,
    },
    {
      id: '3',
      title: 'Wave Motion Explained',
      subject: 'Physics',
      type: 'video',
      size: '89 MB',
      downloadDate: '2024-01-13',
      duration: '15 min',
      progress: 100,
    },
    {
      id: '4',
      title: 'Organic Chemistry Notes',
      subject: 'Chemistry',
      type: 'pdf',
      size: '5.1 MB',
      downloadDate: '2024-01-12',
      pages: '12 pages',
      progress: 100,
    },
    {
      id: '5',
      title: 'Quadratic Equations Practice',
      subject: 'Mathematics',
      type: 'video',
      size: '156 MB',
      downloadDate: '2024-01-11',
      duration: '18 min',
      progress: 65, // Currently downloading
    },
  ];

  const filteredDownloads = downloads.filter(download => {
    if (filter === 'videos') return download.type === 'video';
    if (filter === 'pdfs') return download.type === 'pdf';
    return true;
  });

  const completedDownloads = filteredDownloads.filter(d => d.progress === 100);
  const inProgressDownloads = filteredDownloads.filter(d => d.progress < 100);

  const getTotalSize = (downloads: typeof filteredDownloads) => {
    return downloads.reduce((total, download) => {
      const size = parseFloat(download.size);
      return total + size;
    }, 0).toFixed(1);
  };

  const handleDeleteDownload = (id: string, title: string) => {
    Alert.alert(
      'Delete Download',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          // Handle delete logic here
          console.log('Deleting download:', id);
        }},
      ]
    );
  };

  const getFileIcon = (type: string) => {
    return type === 'video' 
      ? <Play color={colors.primary} size={20} />
      : <FileText color={colors.warning} size={20} />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Downloads
        </Text>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface }]}>
          <Filter color={colors.text} size={20} />
        </TouchableOpacity>
      </View>

      {/* Storage Summary */}
      <Card style={styles.storageCard}>
        <View style={styles.storageHeader}>
          <FolderOpen color={colors.primary} size={24} />
          <Text style={[styles.storageTitle, { color: colors.text }]}>
            Storage Used
          </Text>
        </View>
        
        <View style={styles.storageStats}>
          <View style={styles.storageStat}>
            <Text style={[styles.storageValue, { color: colors.text }]}>
              {getTotalSize(completedDownloads)} MB
            </Text>
            <Text style={[styles.storageLabel, { color: colors.textSecondary }]}>
              Total Downloaded
            </Text>
          </View>
          
          <View style={styles.storageStat}>
            <Text style={[styles.storageValue, { color: colors.text }]}>
              {completedDownloads.length}
            </Text>
            <Text style={[styles.storageLabel, { color: colors.textSecondary }]}>
              Files
            </Text>
          </View>
        </View>
      </Card>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {[
          { key: 'all', label: 'All Files' },
          { key: 'videos', label: 'Videos' },
          { key: 'pdfs', label: 'PDFs' },
        ].map((filterOption) => (
          <TouchableOpacity
            key={filterOption.key}
            style={[
              styles.filterTab,
              filter === filterOption.key && { backgroundColor: colors.primary },
              filter !== filterOption.key && { backgroundColor: colors.surface }
            ]}
            onPress={() => setFilter(filterOption.key as any)}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === filterOption.key && { color: '#ffffff' },
                filter !== filterOption.key && { color: colors.text }
              ]}
            >
              {filterOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* In Progress Downloads */}
      {inProgressDownloads.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Downloading
          </Text>
          
          {inProgressDownloads.map((download) => (
            <Card key={download.id} style={styles.downloadCard}>
              <View style={styles.downloadContent}>
                <View style={styles.downloadHeader}>
                  {getFileIcon(download.type)}
                  <View style={styles.downloadInfo}>
                    <Text style={[styles.downloadTitle, { color: colors.text }]}>
                      {download.title}
                    </Text>
                    <Text style={[styles.downloadSubject, { color: colors.textSecondary }]}>
                      {download.subject}
                    </Text>
                  </View>
                  <Text style={[styles.downloadProgress, { color: colors.primary }]}>
                    {download.progress}%
                  </Text>
                </View>
                
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${download.progress}%`, backgroundColor: colors.primary }
                    ]} 
                  />
                </View>
                
                <View style={styles.downloadMeta}>
                  <Text style={[styles.downloadSize, { color: colors.textSecondary }]}>
                    {download.size}
                  </Text>
                  <TouchableOpacity>
                    <Text style={[styles.cancelButton, { color: colors.error }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
        </View>
      )}

      {/* Downloaded Files */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Downloaded Files
        </Text>
        
        {completedDownloads.map((download) => (
          <Card key={download.id} style={styles.downloadCard}>
            <TouchableOpacity style={styles.downloadContent}>
              <View style={styles.downloadHeader}>
                {getFileIcon(download.type)}
                <View style={styles.downloadInfo}>
                  <Text style={[styles.downloadTitle, { color: colors.text }]}>
                    {download.title}
                  </Text>
                  <Text style={[styles.downloadSubject, { color: colors.textSecondary }]}>
                    {download.subject}
                  </Text>
                </View>
                <TouchableOpacity 
                  onPress={() => handleDeleteDownload(download.id, download.title)}
                >
                  <Trash2 color={colors.error} size={20} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.downloadMeta}>
                <Text style={[styles.downloadSize, { color: colors.textSecondary }]}>
                  {download.size} • {download.duration || download.pages}
                </Text>
                <Text style={[styles.downloadDate, { color: colors.textSecondary }]}>
                  {formatDate(download.downloadDate)}
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        ))}
      </View>

      {/* Empty State */}
      {filteredDownloads.length === 0 && (
        <Card style={styles.emptyState}>
          <Download color={colors.textSecondary} size={48} />
          <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
            No downloads yet
          </Text>
          <Text style={[styles.emptyStateSubtitle, { color: colors.textSecondary }]}>
            Download videos and PDFs to access them offline
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
  storageCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 20,
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storageTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 12,
  },
  storageStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  storageStat: {
    alignItems: 'center',
  },
  storageValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  storageLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  downloadCard: {
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 16,
  },
  downloadContent: {
    gap: 12,
  },
  downloadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadInfo: {
    flex: 1,
    marginLeft: 12,
  },
  downloadTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  downloadSubject: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  downloadProgress: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  downloadMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downloadSize: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  downloadDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  cancelButton: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  emptyState: {
    marginHorizontal: 24,
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});