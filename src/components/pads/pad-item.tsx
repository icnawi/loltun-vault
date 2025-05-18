import React, { useCallback } from 'react';
import { useGameConfig } from '../../context/game-config';
import { ColorPad } from '../../types';
import { addRandomToSequence, last, sleep } from '../../utils';
import { useSynth } from '../../context/synth.tsx';
import { useMessage } from '../../context/message.tsx';
import { GameplayPhase } from '../../constants';

type PadItemProps = {
  pad: ColorPad;
};

export const PadItem: React.FC<PadItemProps> = ({ pad }) => {
  const { ready, playSignalSound } = useSynth();
  const {
    config,
    gamePhase,
    level,
    sequence,
    activeColorPadId,
    setActiveColorPadId,
    setGamePhase,
    setLevel,
    setPlayerInput,
    setSequence,
    playerInput,
  } = useGameConfig();
  const { setMsg } = useMessage();

  // --- Handle Player Clicking an Animal ---
  const handlePadClick = useCallback(
    async (pad: ColorPad) => {
      console.log(
        `handleAnimalClick: Clicked ${pad.id}. gamePhase: ${gamePhase}, isToneStarted: ${ready}. Player input so far: ${JSON.stringify(playerInput)}`,
      );

      if (gamePhase !== GameplayPhase.REPEAT) {
        console.log("handleAnimalClick: Not player's turn. Exiting.");
        return;
      }
      if (!ready) {
        console.warn('handleAnimalClick: Tone is defined but not started. Exiting.');
        setMsg('Audio not ready. Try restarting the game.');
        return;
      }

      playSignalSound(pad);
      setActiveColorPadId(pad.id);
      await sleep(250);
      setActiveColorPadId(null);

      const newPlayerInput = [...playerInput, pad.id];
      setPlayerInput(newPlayerInput);
      console.log('handleAnimalClick: Player input updated:', JSON.stringify(newPlayerInput));

      if (last(newPlayerInput)(newPlayerInput) !== last(sequence)(newPlayerInput).id) {
        console.log(
          'handleAnimalClick: Incorrect animal. Expected:',
          last(sequence)(newPlayerInput).id,
          'Got:',
          last(newPlayerInput)(newPlayerInput),
          'Game Over.',
        );
        setGamePhase('gameover');
        setMsg(`Game Over! You reached level ${level}.`);
        return;
      }

      if (newPlayerInput.length === sequence.length) {
        console.log(
          'handleAnimalClick: Player sequence complete and correct: ',
          JSON.stringify(newPlayerInput),
        );

        setLevel(prevLevel => prevLevel + 1);
        setMsg('Great! Next level...');

        // temp
        const nextPadSignal = addRandomToSequence(config);
        console.log(
          'handleAnimalClick: Advancing level. Sequence just completed was:',
          JSON.stringify(sequence),
          'Animal to add:',
          nextPadSignal,
        );

        const newGeneratedSequence = [...sequence, nextPadSignal];
        setSequence(newGeneratedSequence);

        // Pause for the "Great! Next level..." message to be seen
        await sleep(1000);

        // Now trigger the playback of the new, longer sequence
        setGamePhase(GameplayPhase.WATCH);
        console.log(
          'handleAnimalClick: Set gamePhase to showingSequence. Expect useEffect to play new sequence:',
          JSON.stringify(newGeneratedSequence),
        );
      }
    },
    [gamePhase, playerInput, sequence, level, playSignalSound, ready],
  );

  return (
    <button
      key={pad.id}
      onClick={() => handlePadClick(pad)}
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
