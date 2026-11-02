export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AppError {
  message: string;
  code?: string;
}

export type SortOrder = 'asc' | 'desc';
