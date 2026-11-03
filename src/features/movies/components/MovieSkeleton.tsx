import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from '@/shared/components/feedback/Skeleton';
import { radius, spacing } from '@/shared/theme';

export const MovieSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Skeleton width="70%" height={18} borderRadius={radius.sm} style={styles.mb} />
          <Skeleton width="45%" height={14} borderRadius={radius.sm} />
        </View>
        <Skeleton width={26} height={26} borderRadius={radius.full} />
      </View>
      <View style={styles.badgeRow}>
        <Skeleton width={70} height={22} borderRadius={radius.full} />
        <Skeleton width={90} height={22} borderRadius={radius.full} />
        <Skeleton width={50} height={22} borderRadius={radius.full} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  content: {
    flex: 1,
  },
  mb: {
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
});
