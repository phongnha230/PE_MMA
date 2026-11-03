import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { movieApi } from '@/features/movies/api/movieApi';
import {
  Movie,
  MovieFilterState,
  StatusBreakdownItem,
  MovieStatus,
  Genre,
} from '@/features/movies/types';
import { isDuplicateMovie } from '@/shared/utils/validators';
import { APP_CONSTANTS } from '@/shared/constants/appConstants';
import { haptics } from '@/shared/utils/haptics';

const INITIAL_FILTERS: MovieFilterState = {
  search: '',
  genre: 'All',
  status: 'All',
  favoriteOnly: false,
};

const STATUS_ORDER: Record<MovieStatus, number> = {
  'Plan to Watch': 1,
  'Watching': 2,
  'Watched': 3,
};

export const useMovies = () => {
  const { user } = useAuth();
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MovieFilterState>(INITIAL_FILTERS);

  // Subscribe realtime
  useEffect(() => {
    if (!user) {
      setAllMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = movieApi.subscribeUserMovies(
      user.uid,
      (movies) => {
        // Sắp xếp A-Z không phân biệt hoa thường theo title, trùng thì theo director
        const sorted = [...movies].sort((a, b) => {
          const comp = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
          if (comp !== 0) return comp;
          return a.director.localeCompare(b.director, undefined, { sensitivity: 'base' });
        });
        setAllMovies(sorted);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Bộ lọc danh sách hiển thị
  const filteredMovies = useMemo(() => {
    return allMovies.filter((movie) => {
      // 1. Lọc theo search
      if (filters.search.trim()) {
        const query = filters.search.trim().toLowerCase();
        const matchTitle = movie.title.toLowerCase().includes(query);
        const matchDirector = movie.director.toLowerCase().includes(query);
        if (!matchTitle && !matchDirector) return false;
      }

      // 2. Lọc theo Genre
      if (filters.genre !== 'All' && movie.genre !== filters.genre) {
        return false;
      }

      // 3. Lọc theo Status
      if (filters.status !== 'All' && movie.status !== filters.status) {
        return false;
      }

      // 4. Lọc Favorites only
      if (filters.favoriteOnly && !movie.favorite) {
        return false;
      }

      return true;
    });
  }, [allMovies, filters]);

  // Số lượng phim và số phim yêu thích (tính trên danh sách hiện tại)
  const movieCount = filteredMovies.length;
  const favoriteCount = useMemo(() => {
    return filteredMovies.filter((m) => m.favorite).length;
  }, [filteredMovies]);

  // Status breakdown: chỉ tính các status có ít nhất 1 phim; sắp xếp count cao nhất trước; nếu bằng nhau thì: Plan to Watch -> Watching -> Watched
  const statusBreakdown = useMemo<StatusBreakdownItem[]>(() => {
    const counts: Record<MovieStatus, number> = {
      'Plan to Watch': 0,
      'Watching': 0,
      'Watched': 0,
    };

    filteredMovies.forEach((m) => {
      if (m.status && counts[m.status] !== undefined) {
        counts[m.status]++;
      }
    });

    const items: StatusBreakdownItem[] = (
      Object.keys(counts) as MovieStatus[]
    )
      .filter((status) => counts[status] > 0)
      .map((status) => ({
        status,
        count: counts[status],
      }));

    items.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count; // Cao nhất lên trước
      }
      return STATUS_ORDER[a.status] - STATUS_ORDER[b.status]; // Tie-breaker
    });

    return items;
  }, [filteredMovies]);

  // Thêm phim
  const addMovie = useCallback(
    async (data: {
      title: string;
      director: string;
      genre: Genre;
      status: MovieStatus;
      rating?: number;
      notes?: string;
    }) => {
      if (!user) throw new Error('You must be logged in to add a movie');

      // Kiểm tra trùng lặp (không phân biệt hoa/thường)
      if (isDuplicateMovie(allMovies, data.title, data.director)) {
        throw new Error(APP_CONSTANTS.ERROR_MESSAGES.DUPLICATE_MOVIE);
      }

      const id = await movieApi.addMovie({
        userId: user.uid,
        title: data.title,
        director: data.director,
        genre: data.genre,
        status: data.status,
        rating: data.rating,
        favorite: false,
        notes: data.notes,
        createdAt: Date.now(),
      });

      haptics.notificationSuccess();
      return id;
    },
    [allMovies, user]
  );

  // Cập nhật phim
  const updateMovie = useCallback(
    async (
      movieId: string,
      data: {
        title: string;
        director: string;
        genre: Genre;
        status: MovieStatus;
        rating?: number;
        notes?: string;
        favorite?: boolean;
      }
    ) => {
      if (!user) throw new Error('You must be logged in to update a movie');

      // Kiểm tra trùng lặp loại trừ bản thân
      if (isDuplicateMovie(allMovies, data.title, data.director, movieId)) {
        throw new Error(APP_CONSTANTS.ERROR_MESSAGES.DUPLICATE_MOVIE);
      }

      await movieApi.updateMovie(movieId, data);
      haptics.notificationSuccess();
    },
    [allMovies, user]
  );

  // Toggle favorite
  const toggleFavorite = useCallback(
    async (movie: Movie) => {
      haptics.impactLight();
      await movieApi.toggleFavorite(movie.id, !movie.favorite);
    },
    []
  );

  // Xóa phim
  const deleteMovie = useCallback(async (movieId: string) => {
    haptics.notificationWarning();
    await movieApi.deleteMovie(movieId);
  }, []);

  // Cập nhật filters
  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setGenre = useCallback((genre: string) => {
    haptics.selection();
    setFilters((prev) => ({ ...prev, genre }));
  }, []);

  const setStatus = useCallback((status: string) => {
    haptics.selection();
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  const setFavoriteOnly = useCallback((favoriteOnly: boolean) => {
    haptics.selection();
    setFilters((prev) => ({ ...prev, favoriteOnly }));
  }, []);

  const clearFilters = useCallback(() => {
    haptics.impactLight();
    setFilters(INITIAL_FILTERS);
  }, []);

  return {
    movies: filteredMovies,
    allMovies,
    loading,
    error,
    filters,
    movieCount,
    favoriteCount,
    statusBreakdown,
    addMovie,
    updateMovie,
    deleteMovie,
    toggleFavorite,
    setSearch,
    setGenre,
    setStatus,
    setFavoriteOnly,
    clearFilters,
  };
};
