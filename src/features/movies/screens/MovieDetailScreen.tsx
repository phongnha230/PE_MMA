import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigationProp, AppRouteProp } from '@/core/navigation/types';
import { useMovies } from '@/features/movies/hooks/useMovies';
import { CustomTextInput } from '@/shared/components/inputs/CustomTextInput';
import { CustomSelect, SelectOption } from '@/shared/components/inputs/CustomSelect';
import { Button } from '@/shared/components/buttons/Button';
import { ConfirmDialog } from '@/shared/components/feedback/ConfirmDialog';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { getTheme, radius, spacing, typography } from '@/shared/theme';
import {
  validateMovieTitle,
  validateMovieDirector,
  validateMovieGenre,
  validateMovieStatus,
  validateMovieRating,
  validateMovieNotes,
} from '@/shared/utils/validators';
import { Genre, MovieStatus } from '@/features/movies/types';
import { haptics } from '@/shared/utils/haptics';

const GENRE_OPTIONS: SelectOption[] = [
  { label: 'Choose genre', value: '' },
  { label: 'Action', value: 'Action', icon: 'flash-outline', color: '#EF4444' },
  { label: 'Comedy', value: 'Comedy', icon: 'happy-outline', color: '#F59E0B' },
  { label: 'Drama', value: 'Drama', icon: 'heart-outline', color: '#8B5CF6' },
  { label: 'Horror', value: 'Horror', icon: 'skull-outline', color: '#0F172A' },
];

const STATUS_OPTIONS: SelectOption[] = [
  { label: 'Choose status', value: '' },
  { label: 'Plan to Watch', value: 'Plan to Watch', icon: 'bookmark-outline', color: '#F59E0B' },
  { label: 'Watching', value: 'Watching', icon: 'play-circle-outline', color: '#2563EB' },
  { label: 'Watched', value: 'Watched', icon: 'checkmark-circle-outline', color: '#16A34A' },
];

export const MovieDetailScreen: React.FC = () => {
  const theme = getTheme('movie');
  const navigation = useNavigation<AppNavigationProp<'MovieDetail'>>();
  const route = useRoute<AppRouteProp<'MovieDetail'>>();
  const { movieId } = route.params;

  const { allMovies, updateMovie, deleteMovie, toggleFavorite } = useMovies();

  // Tìm phim theo movieId từ danh sách realtime
  const movie = allMovies.find((m) => m.id === movieId);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  // State cho Edit Mode
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [editError, setEditError] = useState<string | null>(null);

  // Sync state từ movie
  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDirector(movie.director);
      setGenre(movie.genre);
      setStatus(movie.status);
      setRating(movie.rating !== undefined ? String(movie.rating) : '');
      setNotes(movie.notes || '');
    }
  }, [movie]);

  if (!movie) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={theme.textMuted} />
          <Text style={[styles.notFoundText, { color: theme.text }]}>Movie not found</Text>
          <Button
            title="Back to Watchlist"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={styles.backBtn}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleStartEdit = () => {
    haptics.impactLight();
    setHasSubmitted(false);
    setErrors({});
    setEditError(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    haptics.impactLight();
    setTitle(movie.title);
    setDirector(movie.director);
    setGenre(movie.genre);
    setStatus(movie.status);
    setRating(movie.rating !== undefined ? String(movie.rating) : '');
    setNotes(movie.notes || '');
    setHasSubmitted(false);
    setErrors({});
    setEditError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setHasSubmitted(true);
    setEditError(null);

    const titleErr = validateMovieTitle(title);
    const directorErr = validateMovieDirector(director);
    const genreErr = validateMovieGenre(genre);
    const statusErr = validateMovieStatus(status);
    const ratingErr = validateMovieRating(rating);
    const notesErr = validateMovieNotes(notes);

    const formErrors = {
      title: titleErr,
      director: directorErr,
      genre: genreErr,
      status: statusErr,
      rating: ratingErr,
      notes: notesErr,
    };

    setErrors(formErrors);

    if (titleErr || directorErr || genreErr || statusErr || ratingErr || notesErr) {
      return;
    }

    try {
      setSaving(true);
      await updateMovie(movie.id, {
        title: title.trim(),
        director: director.trim(),
        genre: genre as Genre,
        status: status as MovieStatus,
        rating: rating.trim() ? Number(rating.trim()) : undefined,
        notes: notes.trim() ? notes.trim() : undefined,
      });
      setIsEditing(false);
      setHasSubmitted(false);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update movie');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deleteMovie(movie.id);
      setShowDeleteModal(false);
      navigation.goBack();
    } catch (err: any) {
      setEditError(err.message || 'Failed to delete movie');
      setDeleting(false);
    }
  };

  const formattedDate = new Date(movie.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        {/* Top Header */}
        <View style={[styles.header, { borderBottomColor: theme.cardBorder }]}>
          <TouchableOpacity
            style={styles.backIconButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
            {isEditing ? 'Edit Movie' : movie.title}
          </Text>
          <TouchableOpacity
            testID={APP_CONSTANTS.TEST_IDS.TOGGLE_FAVORITE_BUTTON}
            style={styles.favoriteHeaderBtn}
            onPress={() => toggleFavorite(movie)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={movie.favorite ? 'star' : 'star-outline'}
              size={24}
              color={movie.favorite ? '#F59E0B' : '#94A3B8'}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          {editError && (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={18} color="#DC2626" />
              <Text style={styles.errorText}>{editError}</Text>
            </View>
          )}

          {!isEditing ? (
            /* ================= VIEW MODE ================= */
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              {/* Title & Director */}
              <View style={styles.titleSection}>
                <Text style={[styles.movieTitle, { color: theme.text }]}>{movie.title}</Text>
                <Text style={[styles.movieDirector, { color: theme.textMuted }]}>
                  Directed by {movie.director}
                </Text>
              </View>

              {/* Badges */}
              <View style={styles.metaRow}>
                <View style={[styles.badge, { backgroundColor: theme.primaryLight }]}>
                  <Ionicons name="film-outline" size={14} color={theme.primary} />
                  <Text style={[styles.badgeText, { color: theme.primaryDark }]}>
                    {movie.genre}
                  </Text>
                </View>

                <View style={[styles.badge, { backgroundColor: '#DBEAFE' }]}>
                  <Ionicons name="eye-outline" size={14} color="#1D4ED8" />
                  <Text style={[styles.badgeText, { color: '#1D4ED8' }]}>
                    {movie.status}
                  </Text>
                </View>

                {typeof movie.rating === 'number' && (
                  <View style={[styles.badge, { backgroundColor: '#FEF3C7' }]}>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text style={[styles.badgeText, { color: '#B45309' }]}>
                      {movie.rating} / 5
                    </Text>
                  </View>
                )}
              </View>

              {/* Notes */}
              <View style={styles.fieldBlock}>
                <Text style={[styles.fieldBlockLabel, { color: theme.textMuted }]}>
                  Notes
                </Text>
                <Text style={[styles.fieldBlockValue, { color: movie.notes ? theme.text : theme.textMuted }]}>
                  {movie.notes || 'No notes added for this movie.'}
                </Text>
              </View>

              {/* Date Added */}
              <View style={styles.fieldBlock}>
                <Text style={[styles.fieldBlockLabel, { color: theme.textMuted }]}>
                  Added on
                </Text>
                <Text style={[styles.fieldBlockValue, { color: theme.text }]}>
                  {formattedDate}
                </Text>
              </View>

              {/* Action Buttons: Edit & Delete */}
              <View style={styles.actionRow}>
                <Button
                  testID={APP_CONSTANTS.TEST_IDS.EDIT_BUTTON}
                  title="Edit Movie"
                  onPress={handleStartEdit}
                  variant="primary"
                  style={styles.actionBtn}
                />
                <Button
                  testID={APP_CONSTANTS.TEST_IDS.DELETE_BUTTON}
                  title="Delete"
                  onPress={() => setShowDeleteModal(true)}
                  variant="danger"
                  style={styles.actionBtn}
                />
              </View>
            </View>
          ) : (
            /* ================= EDIT MODE ================= */
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
              <Text style={[styles.editModeTitle, { color: theme.text }]}>
                Modify Movie Details
              </Text>

              {/* Title Input */}
              <CustomTextInput
                testID={APP_CONSTANTS.TEST_IDS.TITLE_INPUT}
                label="Title *"
                value={title}
                onChangeText={(val) => {
                  setTitle(val);
                  if (hasSubmitted) {
                    setErrors((p) => ({ ...p, title: validateMovieTitle(val) }));
                    setEditError(null);
                  }
                }}
                error={hasSubmitted ? errors.title : undefined}
              />

              {/* Director Input */}
              <CustomTextInput
                testID={APP_CONSTANTS.TEST_IDS.DIRECTOR_INPUT}
                label="Director *"
                value={director}
                onChangeText={(val) => {
                  setDirector(val);
                  if (hasSubmitted) {
                    setErrors((p) => ({ ...p, director: validateMovieDirector(val) }));
                    setEditError(null);
                  }
                }}
                error={hasSubmitted ? errors.director : undefined}
              />

              {/* Genre Custom Select */}
              <CustomSelect
                testID={APP_CONSTANTS.TEST_IDS.GENRE_PICKER}
                label="Genre"
                required
                value={genre}
                placeholder="Choose genre"
                options={GENRE_OPTIONS}
                onSelect={(val) => {
                  setGenre(val);
                  if (hasSubmitted) {
                    setErrors((p) => ({ ...p, genre: validateMovieGenre(val) }));
                    setEditError(null);
                  }
                }}
                error={hasSubmitted ? errors.genre : undefined}
                leftIcon="film-outline"
              />

              {/* Status Custom Select */}
              <CustomSelect
                testID={APP_CONSTANTS.TEST_IDS.STATUS_PICKER}
                label="Status"
                required
                value={status}
                placeholder="Choose status"
                options={STATUS_OPTIONS}
                onSelect={(val) => {
                  setStatus(val);
                  if (hasSubmitted) {
                    setErrors((p) => ({ ...p, status: validateMovieStatus(val) }));
                    setEditError(null);
                  }
                }}
                error={hasSubmitted ? errors.status : undefined}
                leftIcon="eye-outline"
              />

              {/* Rating */}
              <CustomTextInput
                testID={APP_CONSTANTS.TEST_IDS.RATING_INPUT}
                label="Rating (0 - 5, optional)"
                keyboardType="number-pad"
                value={rating}
                onChangeText={(val) => {
                  setRating(val);
                  if (hasSubmitted) {
                    setErrors((p) => ({ ...p, rating: validateMovieRating(val) }));
                    setEditError(null);
                  }
                }}
                error={hasSubmitted ? errors.rating : undefined}
                maxLength={1}
              />

              {/* Notes */}
              <CustomTextInput
                testID={APP_CONSTANTS.TEST_IDS.NOTES_INPUT}
                label="Notes (optional, max 300 chars)"
                multiline
                numberOfLines={3}
                value={notes}
                onChangeText={(val) => {
                  setNotes(val);
                  if (hasSubmitted) {
                    setErrors((p) => ({ ...p, notes: validateMovieNotes(val) }));
                    setEditError(null);
                  }
                }}
                error={hasSubmitted ? errors.notes : undefined}
                maxLength={300}
              />

              {/* Save & Cancel Buttons */}
              <View style={styles.actionRow}>
                <Button
                  testID={APP_CONSTANTS.TEST_IDS.SAVE_BUTTON}
                  title="Save"
                  onPress={handleSave}
                  loading={saving}
                  variant="primary"
                  style={styles.actionBtn}
                />
                <Button
                  testID={APP_CONSTANTS.TEST_IDS.CANCEL_BUTTON}
                  title="Cancel"
                  onPress={handleCancelEdit}
                  variant="outline"
                  style={styles.actionBtn}
                  disabled={saving}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        visible={showDeleteModal}
        title="Delete Movie"
        message={`Are you sure you want to remove "${movie.title}" from your watchlist? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  backIconButton: {
    padding: 4,
  },
  headerTitle: {
    ...typography.h3,
    fontSize: 16,
    flex: 1,
    marginHorizontal: spacing.md,
    textAlign: 'center',
  },
  favoriteHeaderBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  card: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
  },
  titleSection: {
    marginBottom: spacing.md,
  },
  movieTitle: {
    ...typography.h1,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  movieDirector: {
    ...typography.body,
    fontSize: 15,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.full,
    gap: 5,
  },
  badgeText: {
    ...typography.captionBold,
    fontSize: 12,
  },
  fieldBlock: {
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  fieldBlockLabel: {
    ...typography.captionBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fieldBlockValue: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionBtn: {
    flex: 1,
  },
  editModeTitle: {
    ...typography.h3,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  fieldContainer: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    ...typography.captionBold,
    marginBottom: spacing.xs,
  },
  pickerWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'ios' ? 120 : 50,
  },
  fieldErrorText: {
    ...typography.caption,
    color: '#DC2626',
    marginTop: 4,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  errorText: {
    ...typography.captionBold,
    color: '#B91C1C',
    flex: 1,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  notFoundText: {
    ...typography.h3,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  backBtn: {
    minWidth: 180,
  },
});
