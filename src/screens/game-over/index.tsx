import { FC } from "react";

interface GameOverScreenProps {
    score: number;
    onReplay: () => void;
}

const GameOver: FC<GameOverScreenProps> = ({ score, onReplay }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-red-500">Game Over!</h2>
          <p className="text-3xl mb-8">Your Score: {score}</p>
          <button
            onClick={onReplay}
            className="px-8 py-4 bg-yellow-500 text-gray-900 font-bold rounded-lg text-2xl hover:bg-yellow-600 transition duration-200 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75"
          >
            Replay
          </button>
        </div>
      );
}

export default GameOver;