import { Rewards, Stats } from '../types';

// Game Status
export enum GameplayPhase {
  IDLE = 'idle',
  WATCH = 'watch',
  REPEAT = 'repeat',
  GAMEOVER = 'gameover',
}

// Core mechanics

// Colors
export const DEFAULT_DIAL_COLOR = 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-400';
// export const DIAL_COLORS: Record<DialId, string> = {
//     A: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
//     B: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
//     C: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
// };

// Intervals
export const PLAYBACK_DURATION = 700; // ms an animal stays lit during sequence playback
export const PAUSE_BETWEEN_HIGHLIGHTS = 200; // ms delay between animals in sequence playback

// Levels and difficulty
export const MAX_LEVELS = 4;
export const MAX_ROUNDS = 9;
export const STARTING_LEVEL = 1;

// Rewards
export const REWARD: Rewards = {
  2: { name: 'Gold Coin', value: 100 },
  4: { name: 'Silver Bar', value: 200 },
  6: { name: 'Gold Bar', value: 500 },
  8: { name: 'Diamond Ring', value: 1000 },
  9: { name: '1Up', value: 10000, isOneUp: true },
};

// Play Stats
export const NO_SCORE: Stats = {
  playCount: 0,
  bestScore: 0,
  maxLevel: 0,
  trophiesCount: 0,
  rewards: [],
};
