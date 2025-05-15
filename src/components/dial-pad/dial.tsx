import React from 'react';
import { AnimalId, GameButton } from '../../types';

interface DialProps {
  animal: GameButton;
  activeAnimalId: AnimalId | null;
  onClick: (id: AnimalId) => void;
  // isHighlighted: boolean;
  isDisabled: boolean;
}

export const Dial: React.FC<DialProps> = ({ activeAnimalId, animal, isDisabled, onClick }) => {
  return (
    <button
      key={animal.id}
      onClick={() => onClick(animal.id)}
      disabled={isDisabled}
      className={`
                p-4 h-28 md:h-32 rounded-lg shadow-lg 
                flex flex-col items-center justify-center
                text-2xl md:text-3xl transition-all duration-150 ease-in-out
                focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${activeAnimalId === animal.id ? `bg-${animal.color}-700 ring-4 ring-white transform scale-105` : `bg-${animal.color}-500`}
                ${!isDisabled ? `hover:bg-${animal.color}-600 cursor-pointer` : 'cursor-not-allowed opacity-70'}
              `}>
      <span className="text-4xl md:text-5xl mb-1">{animal.emoji}</span>
    </button>
  );
};
