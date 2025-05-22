import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ANIMALS_SKIN_CONFIG } from '../config/skins';
import {
  GameplayPhase,
  PAUSE_BETWEEN_HIGHLIGHTS,
  PLAYBACK_DURATION,
  STARTING_LEVEL,
} from '../constants';
import { ColorPad, GameplayPhases } from '../types';
import { addRandomToSequence, sleep } from '../utils';
import { useMessage } from './message.tsx';
import { useSynth } from './synth.tsx';

interface GameConfigContextData {
  difficulty?: string;
  config: ColorPad[];
  gamePhase: GameplayPhases;
  level: number;
  sequence: ColorPad[];
  playerInput: string[];
  activeColorPadId: string | null;
  playSequence: () => Promise<void>;
  setGamePhase: Dispatch<SetStateAction<GameplayPhases>>;
  setLevel: Dispatch<SetStateAction<number>>;
  setSequence: Dispatch<SetStateAction<ColorPad[]>>;
  setPlayerInput: Dispatch<SetStateAction<string[]>>;
  setActiveColorPadId: Dispatch<SetStateAction<string | null>>;
  startGame: () => Promise<void>;
}

const GameConfigContext = createContext<GameConfigContextData | null>(null);

type GameConfigProviderProps = {
  children: ReactNode;
};

export const GameConfigProvider: FC<GameConfigProviderProps> = ({ children }) => {
  const [config] = useState(ANIMALS_SKIN_CONFIG);
  const [gamePhase, setGamePhase] = useState<GameplayPhases>(GameplayPhase.IDLE);
  const [level, setLevel] = useState(STARTING_LEVEL);
  const [sequence, setSequence] = useState<ColorPad[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [activeColorPadId, setActiveColorPadId] = useState<string | null>(null);

  const { setMsg } = useMessage();
  const { ready, initializeAudio, playSignalSound } = useSynth();

  const startGame = useCallback(async () => {
    console.log('startGame: Attempting to start/restart game.');
    // Ensure `config` is not empty before proceeding
    await initializeAudio();

    if (config.length === 0) {
      console.error('startGame: `config` is empty! Cannot select a first pad.');
      setMsg('Error: Game configuration is missing. Cannot start.');
      setGamePhase('gameover'); // Or 'idle' to prevent further actions
      return;
    }

    setGamePhase(GameplayPhase.WATCH);
    setLevel(STARTING_LEVEL);
    setPlayerInput([]);
    setSequence([]);
    setMsg('Watch carefully...');
    const firstSignal = addRandomToSequence(config);
    setSequence([addRandomToSequence(config)]);
    console.log('startGame: Game initialized. First signal:', firstSignal, 'State set to demo.');
  }, [ready]);

  // --- Function to Play the Current Sequence ---
  const playSequence = useCallback(async () => {
    console.log(playerInput, sequence);
    if (sequence.length === 0) {
      console.log('playSequence: No sequence to play.');
      return;
    }
    console.log('playSequence: Starting playback of sequence:', JSON.stringify(sequence));

    await sleep(500);

    for (const signal of sequence) {
      console.log(`playSequence: Activating ${signal.id}`);
      setActiveColorPadId(signal.id);
      playSignalSound(signal.note);
      await sleep(PLAYBACK_DURATION);
      setActiveColorPadId(null);
      await sleep(PAUSE_BETWEEN_HIGHLIGHTS);
    }

    setGamePhase(GameplayPhase.REPEAT);
    setMsg('Your turn!');
    setPlayerInput([]);
    console.log('playSequence: Playback finished. State set to playerTurn.');
  }, [sequence, playSignalSound]);

  // --- Effect to Trigger Sequence Playback ---
  useEffect(() => {
    if (gamePhase === GameplayPhase.WATCH && sequence.length > 0) {
      console.log(
        'useEffect[gamePhase, sequence]: Triggering playSequence. Current sequence length:',
        sequence.length,
      );
      playSequence();
    }
  }, [gamePhase, sequence, playSequence]);

  const value = {
    config,
    gamePhase,
    level,
    sequence,
    playerInput,
    activeColorPadId,
    playSequence,
    setGamePhase,
    setLevel,
    setSequence,
    setPlayerInput,
    setActiveColorPadId,
    startGame,
  };
  return <GameConfigContext.Provider value={value}>{children}</GameConfigContext.Provider>;
};

export function useGameConfig() {
  const msgCtx = useContext(GameConfigContext);
  if (!msgCtx) {
    throw new Error('useMyContext must be used within a GameConfigProvider');
  }
  return msgCtx;
}
