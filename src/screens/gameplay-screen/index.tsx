import { FC } from "react";
import Lever from "../../components/lever/lever";
import { LEVERS, MAX_ROUNDS } from "../../constants";
import { LeverId } from "../../types";

interface GameplayScreenProps {
    currentRound: number;
    sequence?: LeverId[];
    onCorrectPress: (leverId: LeverId) => void;
    onIncorrectPress?: () => void;
    highlightedButton: LeverId | null;
    isPlayerTurn: boolean
}

const GamePlayScreen: FC<GameplayScreenProps> = ({
    currentRound,
    sequence,
    onCorrectPress,
    onIncorrectPress, // unused, needed for later use
    highlightedButton,
    isPlayerTurn
}) => {
    const handleLeverPush = (id: LeverId) => {
        if (!isPlayerTurn || highlightedButton) return;
        onCorrectPress(id)
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
           <div className="absolute top-4 left-4 text-white text-2xl font-mono bg-gray-800 bg-opacity-70 p-3 rounded-lg">
            Round: {currentRound} / {MAX_ROUNDS}
          </div>
          <div className="flex justify-center items-center mb-8">
            {LEVERS.map((btnId) => (
              <Lever
                key={btnId}
                id={btnId}
                onClick={handleLeverPush}
                isHighlighted={highlightedButton === btnId}
                // Блокируем, если не ход игрока ИЛИ если идет подсветка (даже если ход игрока, но кнопка подсвечивается)
                isDisabled={!isPlayerTurn || highlightedButton !== null}
              />
            ))}
          </div>
           <p className="text-xl text-gray-300 mt-4 h-6">
        {/* Сообщение о состоянии */}
            {isPlayerTurn ? 'Your turn...' : (highlightedButton ? ' ' : 'Watch the combo...')}
          </p>
        </div>
      );
}

export default GamePlayScreen;