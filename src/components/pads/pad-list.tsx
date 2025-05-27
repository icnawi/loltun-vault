import { FC, useCallback } from 'react';
import { useGameConfig } from '../../context/game-config';
import { ColorPad } from '../../types';
import { PadItem } from './pad-item';
import { GameplayPhase } from '../../constants';
import { useTone } from '../../context/tone.tsx';
import { useMessage } from '../../context/message.tsx';
import { addRandomToSequence, debounce, last, sleep } from '../../utils';

export const PadList: FC = () => {
  const {
    config,
    gamePhase,
    playerInput,
    setPlayerInput,
    sequence,
    setActiveColorPadId,
    setGamePhase,
    setLevel,
    level,
    setSequence,
  } = useGameConfig();
  const { ready, playSignalSound } = useTone();
  const { setMsg } = useMessage();
  // --- Handle Player Clicking an Animal ---

  const onAnimalClick = async (pad: ColorPad) => {
    console.log(
      `handleAnimalClick: Clicked ${pad.id}. gamePhase: ${gamePhase}, isToneStarted: ${ready}. Player input so far: ${JSON.stringify(playerInput)}`,
    );

    if (!ready) {
      console.warn('handleAnimalClick: Tone is defined but not started. Exiting.');
      setMsg('Audio not ready. Try restarting the game.');
      return;
    }

    playSignalSound(pad.note);
    setActiveColorPadId(pad.id);
    await sleep(250);
    setActiveColorPadId(null);

    const newPlayerInput = [...playerInput, pad.id];
    setPlayerInput(newPlayerInput);
    console.log('handleAnimalClick: Player input updated:', JSON.stringify(newPlayerInput));

    //
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
  };

  const handlePadClick = useCallback(debounce(onAnimalClick, 300, true), [
    gamePhase,
    playerInput,
    sequence,
    level,
    playSignalSound,
    ready,
  ]);

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {config.map((pad: ColorPad) => (
        <PadItem key={pad.id} pad={pad} onPadClick={() => handlePadClick(pad)} />
      ))}
    </div>
  );
};
