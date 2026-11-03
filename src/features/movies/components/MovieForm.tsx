import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomTextInput } from '@/shared/components/inputs/CustomTextInput';
import { CustomSelect, SelectOption } from '@/shared/components/inputs/CustomSelect';
import { Button } from '@/shared/components/buttons/Button';
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

interface MovieFormProps {
  onSubmit: (data: {
    title: string;
    director: string;
    genre: Genre;
    status: MovieStatus;
    rating?: number;
    notes?: string;
  }) => Promise<void>;
}

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

export const MovieForm: React.FC<MovieFormProps> = ({ onSubmit }) => {
  const theme = getTheme('movie');

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Re-validate fields when editing
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (hasSubmitted) {
      setErrors((prev) => ({ ...prev, title: validateMovieTitle(val) }));
      setServerError(null);
    }
  };

  const handleDirectorChange = (val: string) => {
    setDirector(val);
    if (hasSubmitted) {
      setErrors((prev) => ({ ...prev, director: validateMovieDirector(val) }));
      setServerError(null);
    }
  };

  const handleGenreChange = (val: string) => {
    setGenre(val);
    if (hasSubmitted) {
      setErrors((prev) => ({ ...prev, genre: validateMovieGenre(val) }));
      setServerError(null);
    }
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    if (hasSubmitted) {
      setErrors((prev) => ({ ...prev, status: validateMovieStatus(val) }));
      setServerError(null);
    }
  };

  const handleRatingChange = (val: string) => {
    setRating(val);
    if (hasSubmitted) {
      setErrors((prev) => ({ ...prev, rating: validateMovieRating(val) }));
      setServerError(null);
    }
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    if (hasSubmitted) {
      setErrors((prev) => ({ ...prev, notes: validateMovieNotes(val) }));
      setServerError(null);
    }
  };

  const handleSubmit = async () => {
    setHasSubmitted(true);
    setServerError(null);
    setSuccessMessage(null);

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
      setSubmitting(true);
      await onSubmit({
        title: title.trim(),
        director: director.trim(),
        genre: genre as Genre,
        status: status as MovieStatus,
        rating: rating.trim() ? Number(rating.trim()) : undefined,
        notes: notes.trim() ? notes.trim() : undefined,
      });

      // Clear form and show exact movie-success text
      setTitle('');
      setDirector('');
      setGenre('');
      setStatus('');
      setRating('');
      setNotes('');
      setHasSubmitted(false);
      setErrors({});
      setSuccessMessage(APP_CONSTANTS.ERROR_MESSAGES.MOVIE_ADDED);
    } catch (err: any) {
      setServerError(err.message || 'Failed to add movie');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View
      testID={APP_CONSTANTS.TEST_IDS.MOVIE_FORM}
      style={[styles.container, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
    >
      <View style={styles.formHeader}>
        <View style={[styles.headerIcon, { backgroundColor: theme.primaryLight }]}>
          <Ionicons name="film-outline" size={20} color={theme.primary} />
        </View>
        <Text style={[styles.formTitle, { color: theme.text }]}>Add New Movie</Text>
      </View>

      {/* Success Banner */}
      {successMessage && (
        <View style={styles.successBanner}>
          <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
          <Text testID={APP_CONSTANTS.TEST_IDS.MOVIE_SUCCESS} style={styles.successText}>
            {successMessage}
          </Text>
        </View>
      )}

      {/* Server / Firestore Error Banner */}
      {serverError && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle" size={18} color="#DC2626" />
          <Text testID={APP_CONSTANTS.TEST_IDS.ERROR_MOVIE} style={styles.errorText}>
            {serverError}
          </Text>
        </View>
      )}

      {/* Title Input */}
      <CustomTextInput
        testID={APP_CONSTANTS.TEST_IDS.TITLE_INPUT}
        label="Title *"
        placeholder="Enter movie title"
        value={title}
        onChangeText={handleTitleChange}
        error={hasSubmitted ? errors.title : undefined}
      />

      {/* Director Input */}
      <CustomTextInput
        testID={APP_CONSTANTS.TEST_IDS.DIRECTOR_INPUT}
        label="Director *"
        placeholder="Enter director name"
        value={director}
        onChangeText={handleDirectorChange}
        error={hasSubmitted ? errors.director : undefined}
      />

      {/* Genre Custom Select (Modern Bottom Sheet) */}
      <CustomSelect
        testID={APP_CONSTANTS.TEST_IDS.GENRE_PICKER}
        label="Genre"
        required
        value={genre}
        placeholder="Choose genre"
        options={GENRE_OPTIONS}
        onSelect={handleGenreChange}
        error={hasSubmitted ? errors.genre : undefined}
        leftIcon="film-outline"
      />

      {/* Status Custom Select (Modern Bottom Sheet) */}
      <CustomSelect
        testID={APP_CONSTANTS.TEST_IDS.STATUS_PICKER}
        label="Status"
        required
        value={status}
        placeholder="Choose status"
        options={STATUS_OPTIONS}
        onSelect={handleStatusChange}
        error={hasSubmitted ? errors.status : undefined}
        leftIcon="eye-outline"
      />

      {/* Rating Input (Optional, 0-5) */}
      <CustomTextInput
        testID={APP_CONSTANTS.TEST_IDS.RATING_INPUT}
        label="Rating (0 - 5, optional)"
        placeholder="e.g. 5"
        keyboardType="number-pad"
        value={rating}
        onChangeText={handleRatingChange}
        error={hasSubmitted ? errors.rating : undefined}
        maxLength={1}
      />

      {/* Notes Input (Optional, max 300) */}
      <CustomTextInput
        testID={APP_CONSTANTS.TEST_IDS.NOTES_INPUT}
        label="Notes (optional, max 300 chars)"
        placeholder="Personal thoughts, favorite quotes..."
        value={notes}
        onChangeText={handleNotesChange}
        error={hasSubmitted ? errors.notes : undefined}
        multiline
        numberOfLines={3}
        maxLength={300}
      />

      {/* Submit Button */}
      <Button
        testID={APP_CONSTANTS.TEST_IDS.SUBMIT_BUTTON}
        title="Add Movie"
        onPress={handleSubmit}
        loading={submitting}
        variant="primary"
        style={styles.submitBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  formTitle: {
    ...typography.h3,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  successText: {
    ...typography.captionBold,
    color: '#15803D',
    flex: 1,
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
  submitBtn: {
    marginTop: spacing.sm,
  },
});
