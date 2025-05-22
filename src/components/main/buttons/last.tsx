import { FC } from 'react';

type LastSequenceButton = {
  onPlayLast: () => void;
};
export const LastSequenceButton: FC<LastSequenceButton> = ({ onPlayLast }) => {
  return (
    <button
      onClick={onPlayLast}
      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 text-xl">
      Last Game
    </button>
  );
};
