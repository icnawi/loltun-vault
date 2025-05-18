import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { panic } from '../utils';
import * as Tone from 'tone';
import { ColorPad } from '../types';

interface SynthContextData {
  ready: boolean;
  starting: boolean;
  error: string | null;
  initializeAudio: () => Promise<void>;
  playSignalSound: (colorPad: ColorPad) => void;
}

const SynthContext = createContext<SynthContextData | null>(null);

type SynthProviderProps = { children: ReactNode };
export const SynthProvider: FC<SynthProviderProps> = ({ children }) => {
  const [audioState, setAudioState] = useState<{
    initialized: boolean;
    starting: boolean;
    error: string | null;
  }>({
    initialized: false,
    starting: false,
    error: null,
  });

  const synthRef = useRef<Tone.Synth<Tone.SynthOptions>>(null);

  const initializeAudio = useCallback(async () => {
    if (synthRef.current || audioState.initialized || audioState.starting) return;

    console.log(synthRef, audioState);
    console.log(Tone.getContext().state);
    try {
      setAudioState(a => ({ ...a, starting: true, error: null }));
      await Tone.start();

      if (Tone.getContext().state !== 'running') {
        console.warn('Tone.js is not loaded. Sound will not be available.');
        return;
      }

      synthRef.current = new Tone.Synth().toDestination();
      console.log('Tone.Synth initialized.');

      setAudioState({ initialized: true, starting: false, error: null });
    } catch (e) {
      if (synthRef.current) {
        synthRef.current.dispose();
        console.log('Callback: Tone.Synth disposed.');
      }

      setAudioState({
        initialized: false,
        starting: false,
        error: 'Failed to load Tone.js',
      });
    }
  }, [audioState.initialized, audioState.starting]);

  const playSignalSound = useCallback(
    (colorPad: ColorPad) => {
      if (!synthRef.current || !audioState.initialized) {
        console.warn('playAnimalSound: Called but synthRef.current is null.');
        return;
      }

      try {
        // console.log(`playAnimalSound: Playing note ${animal.note} for ${animal.id}`); // Verbose, uncomment if needed
        synthRef.current.triggerAttackRelease(colorPad.note, '8n', Tone.now());
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    },
    [audioState.initialized],
  );

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        console.log('Effect: Tone.Synth disposed.');
      }
      setAudioState({
        initialized: false,
        starting: false,
        error: null,
      });
    };
  }, []);

  const value = useMemo(
    () => ({
      ready: audioState.initialized,
      starting: audioState.starting,
      error: audioState.error,
      initializeAudio,
      playSignalSound,
    }),
    [audioState, initializeAudio, playSignalSound],
  );

  return <SynthContext.Provider value={value}>{children}</SynthContext.Provider>;
};

export function useSynth() {
  const ctx = useContext(SynthContext);

  if (!ctx) panic("useContext was used out of Provider's bounds");
  return ctx!;
}
