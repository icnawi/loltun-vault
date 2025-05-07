import { Stats } from "../../types";

interface StatsDisplayProps {
    stats: Stats
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({stats}) => {
    return (
        <div className="absolute top-4 right-4 text-right p-4 bg-gray-800 bg-opacity-70 rounded-lg shadow-md text-white font-mono">
      <div>Play Count: {stats.playCount}</div>
      <div>Score: {stats.score}</div>
      <div>1UPs: {stats.oneUpsCount}</div>
    </div>
    )
};

export default StatsDisplay;