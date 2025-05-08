// General Types
export type DialId = "A" | "B" | "C";
export type Screen = "start" | "game" | "gameover";

// Game Interfaces
export interface Stats {
    playCount: number;
    bestScore: number;
    trophiesCount: number;
}

export interface Reward {
    name: string;
    value: number;
    isOneUp?: boolean;
}

export interface Rewards {
    [round: number]: Reward;
}
