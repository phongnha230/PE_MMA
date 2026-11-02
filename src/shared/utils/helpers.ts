export const sortAlphabetically = <T extends { title: string; author?: string }>(
  items: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const comp = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
    if (comp !== 0) {
      return order === 'asc' ? comp : -comp;
    }
    if (a.author && b.author) {
      const authorComp = a.author.localeCompare(b.author, undefined, { sensitivity: 'base' });
      return order === 'asc' ? authorComp : -authorComp;
    }
    return 0;
  });
};

export const calculateGenreBreakdown = <T extends { genre?: string }>(
  items: T[]
): Record<string, number> => {
  return items.reduce((acc, item) => {
    const key = item.genre?.trim() || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const filterItems = <T extends { title: string; author?: string; genre?: string; isFavorite?: boolean }>(
  items: T[],
  searchQuery: string,
  onlyFavorites: boolean,
  selectedGenre?: string
): T[] => {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    if (onlyFavorites && !item.isFavorite) {
      return false;
    }
    if (selectedGenre && selectedGenre !== 'All' && item.genre !== selectedGenre) {
      return false;
    }
    if (!query) {
      return true;
    }
    const matchTitle = item.title.toLowerCase().includes(query);
    const matchAuthor = item.author ? item.author.toLowerCase().includes(query) : false;
    return matchTitle || matchAuthor;
  });
};
