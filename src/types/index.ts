// General Union Types
import { GameplayPhase } from '../constants';

export type GameplayPhaseId = `${GameplayPhase}`;
export type NoteId = 'C4' | 'E4' | 'G4' | 'A4';

interface ColorPalette {
  base: string;
  active: string;
  hover: string;
}
export interface ColorPad {
  id: string;
  name: string;
  color: ColorPalette;
  char: string;
  note: NoteId; // leaving as string for now
}

// Game Interfaces
export interface Stats {
  playCount: number;
  bestScore: number;
  maxLevel: number;
  trophiesCount: number;
  rewards: Reward[];
}

export interface Reward {
  name: string;
  value: number;
  isOneUp?: boolean;
}

export interface Rewards {
  [round: number]: Reward;
}
