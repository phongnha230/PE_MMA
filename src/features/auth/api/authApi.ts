import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/shared/services/firebase/firebaseConfig';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';

export const authApi = {
  login: async (email: string, password: string): Promise<UserCredential> => {
    try {
      return await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-email'
      ) {
        throw new Error(APP_CONSTANTS.ERROR_MESSAGES.LOGIN_FAILED);
      }
      throw new Error(error.message || APP_CONSTANTS.ERROR_MESSAGES.LOGIN_FAILED);
    }
  },

  register: async (email: string, password: string): Promise<UserCredential> => {
    try {
      return await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email address is already in use.');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error(APP_CONSTANTS.ERROR_MESSAGES.PASSWORD_TOO_SHORT);
      }
      throw new Error(error.message || APP_CONSTANTS.ERROR_MESSAGES.REGISTER_FAILED);
    }
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },
};
