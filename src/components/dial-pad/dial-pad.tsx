import { FC } from 'react';
import { AnimalId, GameButton, GameplayPhaseId } from '../../types';
import { Dial } from './dial';

type DialPadProps = {
  gameConfig: GameButton[];
  // children: ReactNode[];
  activeAnimalId: AnimalId | null;
  onClick: (id: AnimalId) => void;
  gameState: GameplayPhaseId;
};

export const DialPad: FC<DialPadProps> = ({ gameConfig, activeAnimalId, onClick, gameState }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {gameConfig.map((animal: GameButton) => (
        <Dial
          activeAnimalId={activeAnimalId}
          onClick={onClick}
          animal={animal}
          isDisabled={gameState !== 'play'}
        />
      ))}
    </div>
  );
};
