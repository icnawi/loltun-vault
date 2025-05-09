// General Types
export type GameplayStatuses = "idle" | "running" | "pause";
export type DialId = "A" | "B" | "C";

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
