export const APP_CONSTANTS = {
  APP_NAME: 'CineList',
  COLLECTIONS: {
    MOVIES: 'movies',
  },
  GENRES: [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
  ] as const,
  STATUS: [
    'Plan to Watch',
    'Watching',
    'Watched',
  ] as const,
  ERROR_MESSAGES: {
    // Auth Validation Messages
    EMAIL_REQUIRED: 'Email is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
    CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required',
    CONFIRM_PASSWORD_MISMATCH: 'Passwords do not match',
    REGISTRATION_SUCCESS: 'Registration successful',
    LOGIN_FAILED: 'Failed to login. Please check your credentials.',
    REGISTER_FAILED: 'Failed to register account. Please try again.',

    // Movie Form Validation Messages (Chính xác 100% theo đề thi CineList)
    TITLE_REQUIRED: 'Title is required',
    TITLE_TOO_LONG: 'Title must be at most 100 characters',
    DIRECTOR_REQUIRED: 'Director is required',
    DIRECTOR_TOO_LONG: 'Director must be at most 60 characters',
    GENRE_REQUIRED: 'Please choose a genre',
    STATUS_REQUIRED: 'Please choose a status',
    INVALID_RATING: 'Rating must be a whole number from 0 to 5',
    NOTES_TOO_LONG: 'Notes must be at most 300 characters',
    DUPLICATE_MOVIE: 'You already added this movie with the same director',
    MOVIE_ADDED: 'Movie added',
    NO_MOVIES_FOUND: 'No movies found',
  },
  TEST_IDS: {
    // Home Screen Test IDs
    HOME_TITLE: 'home-title',

    // Auth Test IDs
    EMAIL_INPUT: 'email-input',
    PASSWORD_INPUT: 'password-input',
    CONFIRM_PASSWORD_INPUT: 'confirm-password-input',
    LOGIN_BUTTON: 'login-button',
    REGISTER_BUTTON: 'register-button',
    LOGOUT_BUTTON: 'logout-button',
    FORM_SUCCESS: 'form-success',
    ERROR_AUTH: 'error-auth',

    // List & Movie Form Test IDs
    LIST_SCREEN: 'list-screen',
    MOVIE_FORM: 'movie-form',
    MOVIE_SUCCESS: 'movie-success',
    ERROR_MOVIE: 'error-movie',
    MOVIE_ITEM: 'movie-item',
    MOVIES_EMPTY: 'movies-empty',

    // Entity Counts & Stats Test IDs (QUY TẮC: CHỈ CHỨA SỐ NGUYÊN TRẦN)
    MOVIE_COUNT: 'movie-count',
    FAVORITE_COUNT: 'favorite-count',

    // Movie Detail & Action Test IDs
    TITLE_INPUT: 'title-input',
    DIRECTOR_INPUT: 'director-input',
    GENRE_PICKER: 'genre-picker',
    STATUS_PICKER: 'status-picker',
    RATING_INPUT: 'rating-input',
    NOTES_INPUT: 'notes-input',
    SUBMIT_BUTTON: 'submit-button',
    DELETE_BUTTON: 'delete-button',
    EDIT_BUTTON: 'edit-button',
    SAVE_BUTTON: 'save-button',
    CANCEL_BUTTON: 'cancel-button',
    TOGGLE_FAVORITE_BUTTON: 'toggle-favorite-button',
    SEARCH_INPUT: 'search-input',
    CLEAR_BUTTON: 'clear-button',
  },
};
