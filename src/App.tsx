import { useCallback, useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import './App.css';
import { Card } from './components/card/card';
import { DialPad } from './components/dial-pad/dial-pad';
import { GamePane } from './components/game-pane';
import { ControlPanel } from './components/main/control-panel';
import { INTER_ANIMAL_DELAY, SEQUENCE_PLAY_INTERVAL, STARTING_LEVEL } from './constants';
import { AnimalId, GameButton, GameplayPhaseId } from './types';
import { sleep } from './utils';

// It's crucial to include Tone.js in your HTML file:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js"></script>

// --- Game Configuration ---

const ANIMALS_CONFIG: GameButton[] = [
  {
    id: 'turtle',
    name: 'Turtle',
    color: 'green',
    emoji: '🐢',
    note: 'C4',
  },
  {
    id: 'octopus',
    name: 'Octopus',
    color: 'red',
    emoji: '🐙',
    note: 'E4',
  },
  {
    id: 'jellyfish',
    name: 'Jellyfish',
    color: 'blue',
    emoji: '🪼',
    note: 'G4',
  },
  {
    id: 'blowfish',
    name: 'Blowfish',
    color: 'yellow',
    emoji: '🐡',
    note: 'A4',
  },
];

// --- Main Game Component (App) ---
export default function App() {
  const [gamePhase, setGamePhase] = useState<GameplayPhaseId>('idle');
  const [sequence, setSequence] = useState<AnimalId[]>([]);
  const [playerInput, setPlayerInput] = useState<string[]>([]);
  const [level, setLevel] = useState(STARTING_LEVEL);
  const [activeAnimalId, setActiveAnimalId] = useState<AnimalId | null>(null);
  const [message, setMessage] = useState('Click "Start Game" to begin!');
  const [isToneStarted, setIsToneStarted] = useState(false);

  const synthRef = useRef<Tone.Synth<Tone.SynthOptions>>(null);

  // TODO: hook
  // --- Initialize Tone.js Synth ---
  useEffect(() => {
    if (typeof Tone !== 'undefined') {
      synthRef.current = new Tone.Synth().toDestination();
      console.log('Tone.Synth initialized.');
    } else {
      console.warn('Tone.js is not loaded. Sound will not be available.');
      setMessage('Sound library not loaded. Game will be silent.');
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        console.log('Tone.Synth disposed.');
      }
    };
  }, []);

  // --- Function to Play Animal Sound ---
  const playAnimalSound = useCallback(
    (animalId: string) => {
      if (typeof Tone === 'undefined') {
        return;
      }
      if (!isToneStarted) {
        console.warn('playAnimalSound: Called but isToneStarted is false.');
        return;
      }
      if (!synthRef.current) {
        console.warn('playAnimalSound: Called but synthRef.current is null.');
        return;
      }

      const animal = ANIMALS_CONFIG.find(a => a.id === animalId);
      if (animal) {
        try {
          // console.log(`playAnimalSound: Playing note ${animal.note} for ${animal.id}`); // Verbose, uncomment if needed
          synthRef.current.triggerAttackRelease(animal.note, '8n', Tone.now());
        } catch (error) {
          console.error('Error playing sound:', error);
        }
      } else {
        console.warn(`playAnimalSound: Animal with id ${animalId} not found.`);
      }
    },
    [isToneStarted],
  );

  // --- Function to Start/Restart Game ---
  const startGame = useCallback(async () => {
    console.log('startGame: Attempting to start/restart game.');
    if (typeof Tone !== 'undefined' && !isToneStarted) {
      try {
        await Tone.start();
        setIsToneStarted(true);
        console.log('startGame: AudioContext (Tone.start) successfully started!');
      } catch (error) {
        console.error('startGame: Failed to start AudioContext (Tone.start):', error);
        setMessage('Audio could not start. Please interact with the page and try again.');
        return;
      }
    } else if (typeof Tone === 'undefined') {
      console.log('startGame: Tone.js not loaded, proceeding without sound.');
    } else if (isToneStarted) {
      console.log('startGame: Tone already started.');
    }

    // Ensure ANIMALS_CONFIG is not empty before proceeding
    if (ANIMALS_CONFIG.length === 0) {
      console.error('startGame: ANIMALS_CONFIG is empty! Cannot select a first animal.');
      setMessage('Error: Game configuration is missing. Cannot start.');
      setGamePhase('gameover'); // Or 'idle' to prevent further actions
      return;
    }

    setGamePhase('demo');
    setLevel(STARTING_LEVEL);
    setPlayerInput([]);
    setSequence([]);
    setMessage('Watch carefully...');
    const firstAnimal = ANIMALS_CONFIG[Math.floor(Math.random() * ANIMALS_CONFIG.length)].id;
    setSequence([firstAnimal]);
    console.log(
      'startGame: Game initialized. First animal:',
      firstAnimal,
      'State set to showingSequence.',
    );
  }, [isToneStarted]);

  // --- Function to Play the Current Sequence ---
  const playSequence = useCallback(async () => {
    if (sequence.length === 0) {
      console.log('playSequence: No sequence to play.');
      return;
    }
    console.log('playSequence: Starting playback of sequence:', JSON.stringify(sequence));

    await sleep(500);

    for (const animalId of sequence) {
      console.log(`playSequence: Activating ${animalId}`);
      setActiveAnimalId(animalId);
      playAnimalSound(animalId);
      await sleep(SEQUENCE_PLAY_INTERVAL);
      setActiveAnimalId(null);
      await sleep(INTER_ANIMAL_DELAY);
    }

    setGamePhase('play');
    setMessage('Your turn!');
    setPlayerInput([]);
    console.log('playSequence: Playback finished. State set to playerTurn.');
  }, [sequence, playAnimalSound]);

  // --- Effect to Trigger Sequence Playback ---
  useEffect(() => {
    if (gamePhase === 'demo' && sequence.length > 0) {
      console.log(
        'useEffect[gameState, sequence]: Triggering playSequence. Current sequence length:',
        sequence.length,
      );
      playSequence();
    }
  }, [gamePhase, sequence, playSequence]);

  // --- Handle Player Clicking an Animal ---
  const handleAnimalClick = useCallback(
    async (animalId: AnimalId) => {
      console.log(
        `handleAnimalClick: Clicked ${animalId}. gameState: ${gamePhase}, isToneStarted: ${isToneStarted}. Player input so far: ${JSON.stringify(playerInput)}`,
      );

      if (gamePhase !== 'play') {
        console.log("handleAnimalClick: Not player's turn. Exiting.");
        return;
      }
      if (typeof Tone !== 'undefined' && !isToneStarted) {
        console.warn('handleAnimalClick: Tone is defined but not started. Exiting.');
        setMessage('Audio not ready. Try restarting the game.');
        return;
      }

      playAnimalSound(animalId);
      setActiveAnimalId(animalId);
      await sleep(250);
      setActiveAnimalId(null);

      const newPlayerInput = [...playerInput, animalId];
      setPlayerInput(newPlayerInput);
      console.log('handleAnimalClick: Player input updated:', JSON.stringify(newPlayerInput));

      if (newPlayerInput[newPlayerInput.length - 1] !== sequence[newPlayerInput.length - 1]) {
        console.log(
          'handleAnimalClick: Incorrect animal. Expected:',
          sequence[newPlayerInput.length - 1],
          'Got:',
          newPlayerInput[newPlayerInput.length - 1],
          'Game Over.',
        );
        setGamePhase('gameover');
        setMessage(`Game Over! You reached level ${level}.`);
        return;
      }

      if (newPlayerInput.length === sequence.length) {
        console.log(
          'handleAnimalClick: Player sequence complete and correct: ',
          JSON.stringify(newPlayerInput),
        );

        setLevel(prevLevel => prevLevel + 1);
        setMessage('Great! Next level...');

        const nextAnimalToAdd =
          ANIMALS_CONFIG[Math.floor(Math.random() * ANIMALS_CONFIG.length)].id;
        console.log(
          'handleAnimalClick: Advancing level. Sequence just completed was:',
          JSON.stringify(sequence),
          'Animal to add:',
          nextAnimalToAdd,
        );

        const newGeneratedSequence = [...sequence, nextAnimalToAdd];
        setSequence(newGeneratedSequence);

        // Pause for the "Great! Next level..." message to be seen
        await sleep(1000);

        // Now trigger the playback of the new, longer sequence
        setGamePhase('demo');
        console.log(
          'handleAnimalClick: Set gameState to showingSequence. Expect useEffect to play new sequence:',
          JSON.stringify(newGeneratedSequence),
        );
      }
    },
    [gamePhase, playerInput, sequence, level, playAnimalSound, isToneStarted],
  );

  // --- Render Game ---
  return (
    <GamePane>
      <Card.Root>
        <Card.Header level={level} message={message} />
        <Card.Body>
          <DialPad
            activeAnimalId={activeAnimalId}
            gameConfig={ANIMALS_CONFIG}
            gameState={gamePhase}
            onClick={handleAnimalClick}
          />
        </Card.Body>
        <Card.Footer>
          <ControlPanel gamePhase={gamePhase} onStart={startGame}></ControlPanel>
        </Card.Footer>
      </Card.Root>
      <footer className="text-center text-gray-400 mt-8 text-sm">
        <p>Remember the sequence of sights and sounds!</p>
        {typeof Tone === 'undefined' && (
          <p className="text-red-400">Warning: Audio library (Tone.js) not loaded.</p>
        )}
      </footer>
    </GamePane>
  );
}
