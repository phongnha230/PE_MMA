import { APP_CONSTANTS } from '@/shared/constants/appConstants';

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) {
    return APP_CONSTANTS.ERROR_MESSAGES.EMAIL_REQUIRED;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return APP_CONSTANTS.ERROR_MESSAGES.INVALID_EMAIL;
  }
  return null;
};

export const validatePassword = (password: string, isRegister = false): string | null => {
  if (!password) {
    return APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED;
  }
  if (isRegister && password.length < 6) {
    return APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return APP_CONSTANTS.ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED;
  }
  if (password !== confirmPassword) {
    return APP_CONSTANTS.ERROR_MESSAGES.CONFIRM_PASSWORD_MISMATCH;
  }
  return null;
};

export const validateMovieTitle = (title: string): string | null => {
  if (!title || !title.trim()) {
    return APP_CONSTANTS.ERROR_MESSAGES.TITLE_REQUIRED;
  }
  if (title.length > 100) {
    return APP_CONSTANTS.ERROR_MESSAGES.TITLE_TOO_LONG;
  }
  return null;
};

export const validateMovieDirector = (director: string): string | null => {
  if (!director || !director.trim()) {
    return APP_CONSTANTS.ERROR_MESSAGES.DIRECTOR_REQUIRED;
  }
  if (director.length > 60) {
    return APP_CONSTANTS.ERROR_MESSAGES.DIRECTOR_TOO_LONG;
  }
  return null;
};

export const validateMovieGenre = (genre: string): string | null => {
  if (!genre || genre === '' || genre === 'Choose genre') {
    return APP_CONSTANTS.ERROR_MESSAGES.GENRE_REQUIRED;
  }
  const validGenres = APP_CONSTANTS.GENRES as readonly string[];
  if (!validGenres.includes(genre)) {
    return APP_CONSTANTS.ERROR_MESSAGES.GENRE_REQUIRED;
  }
  return null;
};

export const validateMovieStatus = (status: string): string | null => {
  if (!status || status === '' || status === 'Choose status') {
    return APP_CONSTANTS.ERROR_MESSAGES.STATUS_REQUIRED;
  }
  const validStatuses = APP_CONSTANTS.STATUS as readonly string[];
  if (!validStatuses.includes(status)) {
    return APP_CONSTANTS.ERROR_MESSAGES.STATUS_REQUIRED;
  }
  return null;
};

export const validateMovieRating = (ratingStr: string): string | null => {
  if (!ratingStr || !ratingStr.trim()) return null; // rating is optional
  const num = Number(ratingStr.trim());
  if (!/^\d+$/.test(ratingStr.trim()) || isNaN(num) || num < 0 || num > 5) {
    return APP_CONSTANTS.ERROR_MESSAGES.INVALID_RATING;
  }
  return null;
};

export const validateMovieNotes = (notes: string): string | null => {
  if (notes && notes.length > 300) {
    return APP_CONSTANTS.ERROR_MESSAGES.NOTES_TOO_LONG;
  }
  return null;
};

export const isDuplicateMovie = <T extends { title: string; director: string; id?: string }>(
  movies: T[],
  title: string,
  director: string,
  currentId?: string
): boolean => {
  const normTitle = title.trim().toLowerCase();
  const normDirector = director.trim().toLowerCase();

  return movies.some((item) => {
    if (currentId && item.id === currentId) return false;
    return (
      item.title.trim().toLowerCase() === normTitle &&
      item.director.trim().toLowerCase() === normDirector
    );
  });
};
