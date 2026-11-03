import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/shared/services/firebase/firebaseConfig';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { Movie } from '@/features/movies/types';

const MOVIES_COLLECTION = APP_CONSTANTS.COLLECTIONS.MOVIES;

export const movieApi = {
  /**
   * Thêm một bộ phim mới vào collection 'movies'
   */
  async addMovie(movieData: Omit<Movie, 'id'>): Promise<string> {
    const payload: Record<string, any> = {
      userId: movieData.userId,
      title: movieData.title.trim(),
      director: movieData.director.trim(),
      genre: movieData.genre,
      status: movieData.status,
      favorite: Boolean(movieData.favorite),
      createdAt: movieData.createdAt || Date.now(),
    };

    if (movieData.rating !== undefined && movieData.rating !== null && !isNaN(movieData.rating)) {
      payload.rating = Number(movieData.rating);
    }

    if (movieData.notes && movieData.notes.trim()) {
      payload.notes = movieData.notes.trim();
    }

    const docRef = await addDoc(collection(db, MOVIES_COLLECTION), payload);
    return docRef.id;
  },

  /**
   * Cập nhật thông tin phim
   */
  async updateMovie(
    movieId: string,
    movieData: Partial<Omit<Movie, 'id' | 'userId'>>
  ): Promise<void> {
    const docRef = doc(db, MOVIES_COLLECTION, movieId);
    const payload: Record<string, any> = {};

    if (movieData.title !== undefined) payload.title = movieData.title.trim();
    if (movieData.director !== undefined) payload.director = movieData.director.trim();
    if (movieData.genre !== undefined) payload.genre = movieData.genre;
    if (movieData.status !== undefined) payload.status = movieData.status;
    if (movieData.favorite !== undefined) payload.favorite = Boolean(movieData.favorite);

    if (movieData.rating !== undefined) {
      if (movieData.rating !== null && !isNaN(movieData.rating)) {
        payload.rating = Number(movieData.rating);
      } else {
        payload.rating = null;
      }
    }

    if (movieData.notes !== undefined) {
      payload.notes = movieData.notes ? movieData.notes.trim() : '';
    }

    await updateDoc(docRef, payload);
  },

  /**
   * Bật/tắt trạng thái yêu thích
   */
  async toggleFavorite(movieId: string, newFavorite: boolean): Promise<void> {
    const docRef = doc(db, MOVIES_COLLECTION, movieId);
    await updateDoc(docRef, { favorite: newFavorite });
  },

  /**
   * Xóa phim khỏi Firestore
   */
  async deleteMovie(movieId: string): Promise<void> {
    const docRef = doc(db, MOVIES_COLLECTION, movieId);
    await deleteDoc(docRef);
  },

  /**
   * Lắng nghe Realtime các phim thuộc quyền sở hữu của userId
   */
  subscribeUserMovies(
    userId: string,
    onSuccess: (movies: Movie[]) => void,
    onError: (error: Error) => void
  ): Unsubscribe {
    const q = query(
      collection(db, MOVIES_COLLECTION),
      where('userId', '==', userId)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const movies: Movie[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          movies.push({
            id: docSnap.id,
            userId: data.userId,
            title: data.title || '',
            director: data.director || '',
            genre: data.genre,
            status: data.status,
            rating: typeof data.rating === 'number' ? data.rating : undefined,
            favorite: Boolean(data.favorite),
            notes: data.notes || '',
            createdAt: data.createdAt || Date.now(),
          });
        });
        onSuccess(movies);
      },
      (error) => {
        onError(error);
      }
    );
  },
};
