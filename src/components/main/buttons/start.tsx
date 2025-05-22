import { FC } from 'react';

type StartButtonProps = {
  onStart: () => Promise<void>;
  title: string;
};
export const StartButton: FC<StartButtonProps> = ({ onStart, title }) => (
  <button
    onClick={onStart}
    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 text-xl">
    {title}
  </button>
);
