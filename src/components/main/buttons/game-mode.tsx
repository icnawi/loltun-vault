import { FC } from 'react';

type GameModeButtonProps = {
  onSetGameMode: () => void;
};
export const GameModeButton: FC<GameModeButtonProps> = ({ onSetGameMode }) => {
  return (
    <button
      onClick={onSetGameMode}
      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 text-xl">
      Game Mode
    </button>
  );
};
