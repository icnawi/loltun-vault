import { DialId, Rewards, Stats } from "../types";

// Core mechanics
export const COMBO_DIALS: DialId[] = ["A", "B", "C"];

// Colors
export const DEFAULT_DIAL_COLOR =
    "bg-gray-400 hover:bg-gray-500 focus:ring-gray-400";
export const COMBO_DIAL_COLORS: Record<DialId, string> = {
    A: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
    B: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
    C: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
};

// Intervals
export const HIGHLIGHT_DURATION = 600;
export const PAUSE_BETWEEN_HIGHLIGHTS = 300;

// Levels and difficulty
export const MAX_ROUNDS = 9;

// Rewards
export const REWARD: Rewards = {
    2: { name: "Gold Coin", value: 100 },
    4: { name: "Silver Bar", value: 200 },
    6: { name: "Gold Bar", value: 500 },
    8: { name: "Diamond Ring", value: 1000 },
    9: { name: "1Up", value: 10000, isOneUp: true },
};

// Play Stats
export const NO_SCORE: Stats = {
    playCount: 0,
    bestScore: 0,
    trophiesCount: 0,
};
