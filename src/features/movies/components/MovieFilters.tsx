import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MovieFilterState } from '@/features/movies/types';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { getTheme, radius, spacing, typography } from '@/shared/theme';

interface MovieFiltersProps {
  filters: MovieFilterState;
  onSearchChange: (text: string) => void;
  onGenreSelect: (genre: string) => void;
  onStatusSelect: (status: string) => void;
  onFavoriteToggle: (favoriteOnly: boolean) => void;
  onClear: () => void;
}

const GENRE_OPTIONS = ['All', ...APP_CONSTANTS.GENRES];
const STATUS_OPTIONS = ['All', ...APP_CONSTANTS.STATUS];

const GENRE_CHIP_META: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  All: { icon: 'apps-outline', color: '#64748B' },
  Action: { icon: 'flash-outline', color: '#EF4444' },
  Comedy: { icon: 'happy-outline', color: '#F59E0B' },
  Drama: { icon: 'heart-outline', color: '#8B5CF6' },
  Horror: { icon: 'skull-outline', color: '#0F172A' },
};

const STATUS_CHIP_META: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  All: { icon: 'apps-outline', color: '#64748B' },
  'Plan to Watch': { icon: 'bookmark-outline', color: '#F59E0B' },
  Watching: { icon: 'play-circle-outline', color: '#2563EB' },
  Watched: { icon: 'checkmark-circle-outline', color: '#16A34A' },
};

export const MovieFilters: React.FC<MovieFiltersProps> = ({
  filters,
  onSearchChange,
  onGenreSelect,
  onStatusSelect,
  onFavoriteToggle,
  onClear,
}) => {
  const theme = getTheme('movie');

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      {/* Search Input Bar */}
      <View style={[styles.searchBar, { borderColor: theme.inputBorder }]}>
        <Ionicons name="search-outline" size={18} color={theme.textMuted} />
        <TextInput
          testID={APP_CONSTANTS.TEST_IDS.SEARCH_INPUT}
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search by title or director..."
          placeholderTextColor={theme.textMuted}
          value={filters.search}
          onChangeText={onSearchChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {Boolean(filters.search) && (
          <TouchableOpacity onPress={() => onSearchChange('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color={theme.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Genre Filter Chips */}
      <View style={styles.filterSection}>
        <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>Genre</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {GENRE_OPTIONS.map((g) => {
            const isSelected = filters.genre === g;
            const meta = GENRE_CHIP_META[g];

            return (
              <TouchableOpacity
                key={g}
                style={[
                  styles.chip,
                  isSelected
                    ? { backgroundColor: theme.primary, borderColor: theme.primary }
                    : { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' },
                ]}
                onPress={() => onGenreSelect(g)}
              >
                <Ionicons
                  name={meta?.icon || 'pricetag-outline'}
                  size={13}
                  color={isSelected ? '#FFFFFF' : meta?.color || theme.textMuted}
                  style={styles.chipIcon}
                />
                <Text
                  style={[
                    styles.chipText,
                    isSelected ? { color: '#FFFFFF', fontWeight: '700' } : { color: theme.text },
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Status Filter Chips */}
      <View style={styles.filterSection}>
        <Text style={[styles.sectionLabel, { color: theme.textMuted }]}>Status</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {STATUS_OPTIONS.map((s) => {
            const isSelected = filters.status === s;
            const meta = STATUS_CHIP_META[s];

            return (
              <TouchableOpacity
                key={s}
                style={[
                  styles.chip,
                  isSelected
                    ? { backgroundColor: theme.primary, borderColor: theme.primary }
                    : { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' },
                ]}
                onPress={() => onStatusSelect(s)}
              >
                <Ionicons
                  name={meta?.icon || 'pricetag-outline'}
                  size={13}
                  color={isSelected ? '#FFFFFF' : meta?.color || theme.textMuted}
                  style={styles.chipIcon}
                />
                <Text
                  style={[
                    styles.chipText,
                    isSelected ? { color: '#FFFFFF', fontWeight: '700' } : { color: theme.text },
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Bottom Row: Favorites Only Switch & Clear Button */}
      <View style={styles.bottomRow}>
        <View style={styles.switchWrapper}>
          <Ionicons
            name="star"
            size={18}
            color={filters.favoriteOnly ? '#F59E0B' : '#94A3B8'}
          />
          <Text style={[styles.switchLabel, { color: theme.text }]}>Favorites only</Text>
          <Switch
            value={filters.favoriteOnly}
            onValueChange={onFavoriteToggle}
            trackColor={{ false: '#CBD5E1', true: theme.primaryLight }}
            thumbColor={filters.favoriteOnly ? theme.primary : '#F8FAFC'}
          />
        </View>

        <TouchableOpacity
          testID={APP_CONSTANTS.TEST_IDS.CLEAR_BUTTON}
          style={[styles.clearButton, { borderColor: theme.primary }]}
          onPress={onClear}
        >
          <Ionicons name="refresh-outline" size={15} color={theme.primary} />
          <Text style={[styles.clearButtonText, { color: theme.primary }]}>Clear</Text>
        </TouchableOpacity>
      </View>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    height: 44,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    fontSize: 14,
    paddingVertical: 0,
  },
  filterSection: {
    marginBottom: spacing.xs,
  },
  sectionLabel: {
    ...typography.captionBold,
    fontSize: 11,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipsRow: {
    gap: spacing.xs,
    paddingBottom: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  chipIcon: {
    marginRight: 4,
  },
  chipText: {
    ...typography.caption,
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  switchLabel: {
    ...typography.captionBold,
    fontSize: 13,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    gap: 4,
  },
  clearButtonText: {
    ...typography.captionBold,
    fontSize: 12,
  },
});
