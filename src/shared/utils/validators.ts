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

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED;
  }
  if (password.length < 6) {
    return APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED;
  }
  if (password !== confirmPassword) {
    return APP_CONSTANTS.ERROR_MESSAGES.CONFIRM_PASSWORD_MISMATCH;
  }
  return null;
};

export const validateRequired = (
  value: string,
  message: string
): string | null => {
  if (!value || !value.trim()) {
    return message;
  }
  return null;
};

export const validateYear = (yearStr: string): string | null => {
  if (!yearStr || !yearStr.trim()) return null; // optional in form
  const yearNum = Number(yearStr.trim());
  if (isNaN(yearNum) || !Number.isInteger(yearNum) || yearNum < 1000 || yearNum > 3000) {
    return APP_CONSTANTS.ERROR_MESSAGES.INVALID_YEAR;
  }
  return null;
};

export const isDuplicateItem = <T extends { title: string; author: string; id?: string }>(
  items: T[],
  title: string,
  author: string,
  currentId?: string
): boolean => {
  const normalizedTitle = title.trim().toLowerCase();
  const normalizedAuthor = author.trim().toLowerCase();

  return items.some((item) => {
    if (currentId && item.id === currentId) {
      return false;
    }
    return (
      item.title.trim().toLowerCase() === normalizedTitle &&
      item.author.trim().toLowerCase() === normalizedAuthor
    );
  });
};
