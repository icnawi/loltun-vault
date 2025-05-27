import { useGameConfig } from '../../context/game-config';
import { ColorPad } from '../../types';
import { GameplayPhase } from '../../constants';
import { FC } from 'react';

type PadItemProps = {
  pad: ColorPad;
  onPadClick: () => void;
};

export const PadItem: FC<PadItemProps> = ({ pad, onPadClick }) => {
  const { gamePhase, activeColorPadId } = useGameConfig();

  return (
    <button
      key={pad.id}
      onClick={onPadClick}
      disabled={gamePhase !== GameplayPhase.REPEAT}
      className={`
                p-4 h-28 md:h-32 rounded-lg shadow-lg 
                flex flex-col items-center justify-center
                text-2xl md:text-3xl transition-all duration-150 ease-in-out
                focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${activeColorPadId === pad.id ? `${pad.color.active} ring-4 ring-white transform scale-105` : pad.color.base}
                ${gamePhase === GameplayPhase.REPEAT ? `${pad.color.hover} cursor-pointer` : 'cursor-not-allowed opacity-70'}
              `}>
      <span className="text-4xl md:text-5xl mb-1">{pad.char}</span>
    </button>
  );
};
