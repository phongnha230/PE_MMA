export const APP_CONSTANTS = {
  COLLECTIONS: {
    BOOKS: 'books',
  },
  GENRES: [
    'Fiction',
    'Non-Fiction',
    'Science',
    'Technology',
    'History',
    'Fantasy',
    'Mystery',
    'Romance',
  ] as const,
  STATUS: [
    'Reading',
    'Completed',
    'Plan to Read',
  ] as const,
  ERROR_MESSAGES: {
    TITLE_REQUIRED: 'Title is required',
    AUTHOR_REQUIRED: 'Author is required',
    GENRE_REQUIRED: 'Genre is required',
    DUPLICATE_ITEM: 'This book already exists in your list',
    INVALID_YEAR: 'Year must be a number between 1000 and 3000',
    EMAIL_REQUIRED: 'Email is required',
    INVALID_EMAIL: 'Invalid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
    CONFIRM_PASSWORD_MISMATCH: 'Passwords do not match',
    LOGIN_FAILED: 'Failed to login. Please check your credentials.',
    REGISTER_FAILED: 'Failed to register account. Please try again.',
  },
  TEST_IDS: {
    // Auth Test IDs
    EMAIL_INPUT: 'email-input',
    PASSWORD_INPUT: 'password-input',
    CONFIRM_PASSWORD_INPUT: 'confirm-password-input',
    LOGIN_BUTTON: 'login-button',
    REGISTER_BUTTON: 'register-button',
    LOGOUT_BUTTON: 'logout-button',

    // Entity Counts & Stats Test IDs (QUY TẮC: CHỈ CHỨA SỐ NGUYÊN TRẦN)
    BOOK_COUNT: 'book-count',
    FAVORITE_COUNT: 'favorite-count',

    // Entity Form & Actions
    TITLE_INPUT: 'title-input',
    AUTHOR_INPUT: 'author-input',
    GENRE_PICKER: 'genre-picker',
    YEAR_INPUT: 'year-input',
    DESCRIPTION_INPUT: 'description-input',
    SUBMIT_BUTTON: 'submit-button',
    DELETE_BUTTON: 'delete-button',
    EDIT_BUTTON: 'edit-button',
    TOGGLE_FAVORITE_BUTTON: 'toggle-favorite-button',
    SEARCH_INPUT: 'search-input',
    FILTER_ALL_BUTTON: 'filter-all-button',
    FILTER_FAVORITE_BUTTON: 'filter-favorite-button',
  },
};
