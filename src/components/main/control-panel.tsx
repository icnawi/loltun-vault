import { FC, ReactElement, ReactNode } from 'react';
import { GameplayPhaseId } from '../../types';

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

type ControlPanelProps = {
  gamePhase: GameplayPhaseId;
  onStart: () => void;
};

export const ControlPanel: FC<ControlPanelProps> = ({ gamePhase, onStart }) => (
  <>
    {gamePhase === 'idle' || gamePhase === 'gameover' ? (
      <button
        onClick={onStart}
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105 text-xl">
        {gamePhase === 'gameover' ? 'Restart' : 'Start Game'}
      </button>
    ) : null}
  </>
);
