// General Union Types
export type GameplayPhaseId = "idle" | "demo" | "play" | "gameover";
export type ColorId = "blue" | "red" | "green" | "yellow";
export type DialId = "A" | "B" | "C" | "D";
export type AnimalId = "turtle" | "octopus" | "jellyfish" | "blowfish";
export type ToneId = "C4" | "E4" | "G4" | "A4";

export interface GameButton {
    id: AnimalId;
    name: string;
    color: ColorId;
    emoji: string;
    note: ToneId; // leaving as string for now
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
