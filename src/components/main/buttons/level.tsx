import { FC } from 'react';

type LevelSelectButtonProps = {
  onSelectLevel: () => void;
};
export const LevelSelectButton: FC<LevelSelectButtonProps> = ({ onSelectLevel }) => {
  return (
    <button
      onClick={onSelectLevel}
      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 text-xl">
      Level
    </button>
  );
};
