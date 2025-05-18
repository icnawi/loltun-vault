import { Stats } from '../types';
import { FC } from 'react';

interface GameSummaryProps {
  stats: Stats;
}

export const GameSummary: FC<GameSummaryProps> = ({ stats }) => {
  return (
    <div className="absolute top-4 right-4 text-right p-4 bg-gray-800 bg-opacity-70 rounded-lg shadow-md text-white font-mono">
      <div>Play Count: {stats.playCount}</div>
      <div>Score: {stats.bestScore}</div>
      <div>1UPs: {stats.trophiesCount}</div>
    </div>
  );
};
