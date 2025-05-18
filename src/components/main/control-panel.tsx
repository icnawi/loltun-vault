import { FC, ReactElement, ReactNode } from 'react';
import { useGameConfig } from '../../context/game-config';
import { GameplayPhase } from '../../constants';

type FlexRowProps = {
  children: ReactNode | ReactElement | ReactElement[];
  className?: string;
};

export const FlexRow: FC<FlexRowProps> = ({ children, className = '' }) => (
  <div className={`flex flex-row justify-center ${className}`}>{children}</div>
);

export const ColumnRow: FC<FlexRowProps> = ({ children, className = '' }) => (
  <div className={`flex flex-col justify-center ${className}`}>{children}</div>
);

export const ControlPanel: FC = () => {
  const { gamePhase, startGame } = useGameConfig();

  return (
    <>
      {gamePhase === GameplayPhase.IDLE || gamePhase === GameplayPhase.GAMEOVER ? (
        <button
          onClick={startGame}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 text-xl">
          {gamePhase === 'gameover' ? 'Restart' : 'Start Game'}
        </button>
      ) : null}
    </>
  );
};
