import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBreakdownItem } from '@/features/movies/types';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { getTheme, radius, spacing, typography } from '@/shared/theme';

interface MovieSummaryProps {
  movieCount: number;
  favoriteCount: number;
  statusBreakdown: StatusBreakdownItem[];
}

export const MovieSummary: React.FC<MovieSummaryProps> = ({
  movieCount,
  favoriteCount,
  statusBreakdown,
}) => {
  const theme = getTheme('movie');

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Plan to Watch':
        return { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' };
      case 'Watching':
        return { bg: '#DBEAFE', text: '#1D4ED8', border: '#BFDBFE' };
      case 'Watched':
        return { bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0' };
      default:
        return { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' };
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <Text style={[styles.title, { color: theme.text }]}>Watchlist Summary</Text>

      {/* Main Stats Counters */}
      <View style={styles.countersRow}>
        {/* Total Movies Count Card */}
        <View style={[styles.counterCard, { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }]}>
          <View style={styles.counterIconWrapper}>
            <Ionicons name="film" size={20} color={theme.primary} />
            <Text style={styles.counterLabel}>Movies</Text>
          </View>
          {/* QUY TẮC BẮT BUỘC: CHỈ IN SỐ NGUYÊN TRẦN VÀO TESTID */}
          <Text testID={APP_CONSTANTS.TEST_IDS.MOVIE_COUNT} style={[styles.counterValue, { color: theme.primary }]}>
            {movieCount}
          </Text>
        </View>

        {/* Favorites Count Card */}
        <View style={[styles.counterCard, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
          <View style={styles.counterIconWrapper}>
            <Ionicons name="star" size={20} color="#F59E0B" />
            <Text style={styles.counterLabel}>Favorites</Text>
          </View>
          {/* QUY TẮC BẮT BUỘC: CHỈ IN SỐ NGUYÊN TRẦN VÀO TESTID */}
          <Text testID={APP_CONSTANTS.TEST_IDS.FAVORITE_COUNT} style={[styles.counterValue, { color: '#B45309' }]}>
            {favoriteCount}
          </Text>
        </View>
      </View>

      {/* Status Breakdown Section */}
      {statusBreakdown.length > 0 && (
        <View style={styles.breakdownSection}>
          <Text style={[styles.breakdownHeader, { color: theme.textMuted }]}>
            Status Breakdown (Ordered)
          </Text>
          <View style={styles.breakdownList}>
            {statusBreakdown.map((item) => {
              const bStyle = getStatusBadgeStyle(item.status);
              return (
                <View
                  key={item.status}
                  style={[
                    styles.breakdownItem,
                    { backgroundColor: bStyle.bg, borderColor: bStyle.border },
                  ]}
                >
                  <Text style={[styles.breakdownStatusText, { color: bStyle.text }]}>
                    {item.status}
                  </Text>
                  <View style={[styles.countBadge, { backgroundColor: bStyle.text }]}>
                    <Text style={styles.countBadgeText}>{item.count}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  title: {
    ...typography.h3,
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  countersRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  counterCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  counterIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  counterLabel: {
    ...typography.captionBold,
    color: '#64748B',
    fontSize: 13,
  },
  counterValue: {
    ...typography.h1,
    fontSize: 26,
    fontWeight: '800',
  },
  breakdownSection: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  breakdownHeader: {
    ...typography.captionBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  breakdownList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.full,
    borderWidth: 1,
    gap: 6,
  },
  breakdownStatusText: {
    ...typography.captionBold,
    fontSize: 12,
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.full,
  },
  countBadgeText: {
    ...typography.captionBold,
    color: '#FFFFFF',
    fontSize: 11,
  },
});
