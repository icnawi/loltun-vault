import { Stats } from "../types";

interface GameSummaryProps {
    stats: Stats
}

const GameSummary: React.FC<GameSummaryProps> = ({stats}) => {
    return (
        <div className="absolute top-4 right-4 text-right p-4 bg-gray-800 bg-opacity-70 rounded-lg shadow-md text-white font-mono">
      <div>Play Count: {stats.playCount}</div>
      <div>Score: {stats.bestScore}</div>
      <div>1UPs: {stats.trophiesCount}</div>
    </div>
    )
};

export default GameSummary;