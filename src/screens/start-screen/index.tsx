import { FC } from "react";

interface StartScreenProps {
    onStart: () => void
}

const StartScreen: FC<StartScreenProps> = ({onStart}) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white text-center">Memorize the sequence!</h1>
          <button
            onClick={onStart}
            className="px-8 py-4 bg-yellow-500 text-gray-900 font-bold rounded-lg text-2xl hover:bg-yellow-600 transition duration-200 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75"
          >
            Start Game
          </button>
        </div>
      );
}

export default StartScreen;