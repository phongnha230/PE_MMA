import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/core/navigation/types';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useMovies } from '@/features/movies/hooks/useMovies';
import { MovieForm } from '@/features/movies/components/MovieForm';
import { MovieCard } from '@/features/movies/components/MovieCard';
import { MovieFilters } from '@/features/movies/components/MovieFilters';
import { MovieSummary } from '@/features/movies/components/MovieSummary';
import { MovieSkeleton } from '@/features/movies/components/MovieSkeleton';
import { ConfirmDialog } from '@/shared/components/feedback/ConfirmDialog';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { getTheme, radius, spacing, typography } from '@/shared/theme';
import { Movie } from '@/features/movies/types';
import { haptics } from '@/shared/utils/haptics';

export const MovieListScreen: React.FC = () => {
  const theme = getTheme('movie');
  const navigation = useNavigation<AppNavigationProp<'MovieList'>>();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const {
    movies,
    loading,
    filters,
    movieCount,
    favoriteCount,
    statusBreakdown,
    addMovie,
    toggleFavorite,
    setSearch,
    setGenre,
    setStatus,
    setFavoriteOnly,
    clearFilters,
  } = useMovies();

  const handleOpenLogout = () => {
    haptics.notificationWarning();
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } finally {
      setLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate('MovieDetail', { movieId: movie.id });
    },
    [navigation]
  );

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => (
      <MovieCard
        movie={item}
        onPress={handleMoviePress}
        onToggleFavorite={toggleFavorite}
      />
    ),
    [handleMoviePress, toggleFavorite]
  );

  const keyExtractor = useCallback((item: Movie) => item.id, []);

  // Header Component for FlatList
  const renderListHeader = useCallback(() => {
    return (
      <View>
        {/* Form thêm phim */}
        <MovieForm onSubmit={async (data) => { await addMovie(data); }} />

        {/* Bộ lọc & Tìm kiếm */}
        <MovieFilters
          filters={filters}
          onSearchChange={setSearch}
          onGenreSelect={setGenre}
          onStatusSelect={setStatus}
          onFavoriteToggle={setFavoriteOnly}
          onClear={clearFilters}
        />

        {/* Bảng tổng kết Summary */}
        <MovieSummary
          movieCount={movieCount}
          favoriteCount={favoriteCount}
          statusBreakdown={statusBreakdown}
        />

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            My Watchlist
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>
            {movieCount} movies found
          </Text>
        </View>
      </View>
    );
  }, [
    addMovie,
    filters,
    setSearch,
    setGenre,
    setStatus,
    setFavoriteOnly,
    clearFilters,
    movieCount,
    favoriteCount,
    statusBreakdown,
    theme.text,
    theme.textMuted,
  ]);

  // Empty State Component
  const renderEmptyComponent = useCallback(() => {
    if (loading) {
      return (
        <View>
          <MovieSkeleton />
          <MovieSkeleton />
          <MovieSkeleton />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <View style={[styles.emptyIconCircle, { backgroundColor: theme.primaryLight }]}>
          <Ionicons name="film-outline" size={36} color={theme.primary} />
        </View>
        {/* QUY TẮC BẮT BUỘC: TESTID movies-empty CHỨA CHÍNH XÁC TEXT 'No movies found' */}
        <Text testID={APP_CONSTANTS.TEST_IDS.MOVIES_EMPTY} style={[styles.emptyTitle, { color: theme.text }]}>
          {APP_CONSTANTS.ERROR_MESSAGES.NO_MOVIES_FOUND}
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
          Add a movie above or adjust your search filters to explore your watchlist.
        </Text>
      </View>
    );
  }, [loading, theme]);

  return (
    <SafeAreaView
      testID={APP_CONSTANTS.TEST_IDS.LIST_SCREEN}
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={['top', 'left', 'right']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        {/* Top Header Bar: User email + Logout */}
        <View style={[styles.topHeader, { borderBottomColor: theme.cardBorder }]}>
          <View style={styles.headerLeft}>
            <View style={[styles.logoBadge, { backgroundColor: theme.primaryLight }]}>
              <Ionicons name="film" size={20} color={theme.primary} />
            </View>
            <View>
              <Text style={[styles.appName, { color: theme.text }]}>CineList</Text>
              <Text style={[styles.userEmail, { color: theme.textMuted }]} numberOfLines={1}>
                {user?.email || 'Logged in user'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            testID={APP_CONSTANTS.TEST_IDS.LOGOUT_BUTTON}
            style={[styles.logoutBtn, { borderColor: theme.cardBorder }]}
            onPress={handleOpenLogout}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList optimized with useCallback, windowSize and initialNumToRender */}
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          initialNumToRender={6}
          windowSize={5}
          maxToRenderPerBatch={8}
        />
      </KeyboardAvoidingView>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        visible={showLogoutModal}
        title="Sign Out"
        message="Are you sure you want to sign out of your CineList account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="danger"
        loading={loggingOut}
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    marginRight: spacing.sm,
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    ...typography.h3,
    fontSize: 16,
    fontWeight: '800',
  },
  userEmail: {
    ...typography.caption,
    fontSize: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    gap: 4,
    backgroundColor: '#FEF2F2',
  },
  logoutBtnText: {
    ...typography.captionBold,
    color: '#EF4444',
    fontSize: 12,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    fontSize: 16,
  },
  sectionSubtitle: {
    ...typography.caption,
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.h3,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    fontSize: 13,
    textAlign: 'center',
  },
});
