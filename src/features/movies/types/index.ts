export type Genre = 'Action' | 'Comedy' | 'Drama' | 'Horror';

export type MovieStatus = 'Plan to Watch' | 'Watching' | 'Watched';

export interface Movie {
  id: string;
  userId: string;
  title: string;
  director: string;
  genre: Genre;
  status: MovieStatus;
  rating?: number;
  favorite: boolean;
  notes?: string;
  createdAt: number;
}

export interface MovieFormData {
  title: string;
  director: string;
  genre: string;
  status: string;
  rating: string;
  notes: string;
}

export interface MovieFormErrors {
  title?: string | null;
  director?: string | null;
  genre?: string | null;
  status?: string | null;
  rating?: string | null;
  notes?: string | null;
}

export interface MovieFilterState {
  search: string;
  genre: string;
  status: string;
  favoriteOnly: boolean;
}

export interface StatusBreakdownItem {
  status: MovieStatus;
  count: number;
}
