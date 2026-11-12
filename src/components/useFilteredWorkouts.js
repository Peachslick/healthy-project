import { useMemo } from 'react';
import { workouts } from '../data/workouts';

// Filter workouts by search text (Thai/English name) and category
export default function useFilteredWorkouts(query, category) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    return workouts.filter((w) => {
      const matchCat = category === 'all' || w.categories.includes(category);
      const matchText = !q || w.name.toLowerCase().includes(q) || w.nameEn.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [query, category]);
}

