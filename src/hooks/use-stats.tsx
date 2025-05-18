import { useEffect, useState } from 'react';
import { Stats } from '../types';

export const useStats = (defaultStats: Stats, key: string) => {
  const [stats, setStats] = useState<Stats>(() => {
    const savedStats = localStorage.getItem(key);
    return savedStats ? JSON.parse(savedStats) : defaultStats;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(stats));
  }, [key, stats]);

  return [stats, setStats];
};
