import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '@/features/movies/types';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { getTheme, radius, spacing, typography } from '@/shared/theme';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  onToggleFavorite,
}) => {
  const theme = getTheme('movie');

  const getStatusColor = (status: string) => {
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

  const statusStyle = getStatusColor(movie.status);

  return (
    <TouchableOpacity
      testID={APP_CONSTANTS.TEST_IDS.MOVIE_ITEM}
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
        },
        theme.cardShadow,
      ]}
      onPress={() => onPress(movie)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, { color: theme.text }]} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={[styles.directorText, { color: theme.textMuted }]} numberOfLines={1}>
            Directed by {movie.director}
          </Text>
        </View>

        {/* Favorite Toggle Star */}
        <TouchableOpacity
          testID={APP_CONSTANTS.TEST_IDS.TOGGLE_FAVORITE_BUTTON}
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(movie)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons
            name={movie.favorite ? 'star' : 'star-outline'}
            size={24}
            color={movie.favorite ? '#F59E0B' : '#94A3B8'}
          />
        </TouchableOpacity>
      </View>

      {/* Badges: Genre & Status */}
      <View style={styles.badgeRow}>
        <View style={[styles.genreBadge, { backgroundColor: theme.primaryLight }]}>
          <Ionicons name="film-outline" size={12} color={theme.primary} />
          <Text style={[styles.genreBadgeText, { color: theme.primaryDark }]}>
            {movie.genre}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusStyle.bg, borderColor: statusStyle.border },
          ]}
        >
          <View style={[styles.statusDot, { backgroundColor: statusStyle.text }]} />
          <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>
            {movie.status}
          </Text>
        </View>

        {/* Rating Badge if present */}
        {typeof movie.rating === 'number' && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color="#F59E0B" />
            <Text style={styles.ratingText}>{movie.rating}/5</Text>
          </View>
        )}
      </View>

      {/* Notes preview if present */}
      {Boolean(movie.notes) && (
        <View style={styles.notesContainer}>
          <Ionicons name="chatbox-ellipses-outline" size={14} color={theme.textMuted} />
          <Text style={[styles.notesText, { color: theme.textMuted }]} numberOfLines={2}>
            {movie.notes}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  titleText: {
    ...typography.h3,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  directorText: {
    ...typography.caption,
    fontSize: 13,
  },
  favoriteButton: {
    padding: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  genreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    gap: 4,
  },
  genreBadgeText: {
    ...typography.captionBold,
    fontSize: 11,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusBadgeText: {
    ...typography.captionBold,
    fontSize: 11,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    gap: 3,
  },
  ratingText: {
    ...typography.captionBold,
    color: '#B45309',
    fontSize: 11,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 6,
  },
  notesText: {
    ...typography.caption,
    flex: 1,
    fontStyle: 'italic',
    fontSize: 12,
  },
});
