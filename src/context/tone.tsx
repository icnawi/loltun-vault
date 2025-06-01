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
import { Note } from '../types';

interface ToneContextData {
  ready: boolean;
  starting: boolean;
  mute: boolean;
  error: string | null;
  initializeAudio: () => Promise<void>;
  playSignalSound: (note: Note) => void;
  muteOutput: () => void;
}

interface AudioState {
  initialized: boolean;
  mute: boolean;
  starting: boolean;
  error: string | null;
}

const ToneContext = createContext<ToneContextData | null>(null);

type ToneProviderProps = { children: ReactNode };
export const ToneProvider: FC<ToneProviderProps> = ({ children }) => {
  const [audioState, setAudioState] = useState<AudioState>({
    mute: false,
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
      console.log('Tone.Synth initialized.', synthRef.current);

      setAudioState({ initialized: true, mute: false, starting: false, error: null });
    } catch (e) {
      if (synthRef.current) {
        synthRef.current.dispose();
        console.log('Callback: Tone.Synth disposed.');
      }

      setAudioState({
        initialized: false,
        starting: false,
        mute: false,
        error: 'Failed to load Tone.js',
      });
    }
  }, [audioState.initialized, audioState.starting]);

  const muteOutput = useCallback(() => {
    if (!synthRef.current) {
      console.warn('Called but Synth Ref is null.');
      return;
    }

    console.log('before mute', audioState);
    try {
      if (!audioState.mute) {
        synthRef.current.context.destination.mute = true;
        setAudioState(a => ({ ...a, mute: true }));
        console.log('on mute', audioState);
      } else {
        synthRef.current.context.destination.mute = false;
        setAudioState(a => ({ ...a, mute: false }));
        console.log('on unmute', audioState);
      }
    } catch (error) {
      console.error('Error muting sound output:', error);
    }
  }, [audioState.mute]);

  const playSignalSound = useCallback(
    (note: Note) => {
      if (!synthRef.current || !audioState.initialized) {
        console.warn('playAnimalSound: Called but synthRef.current is null.');
        return;
      }

      try {
        // console.log(`playAnimalSound: Playing note ${animal.note} for ${animal.id}`); // Verbose, uncomment if needed
        synthRef.current.triggerAttackRelease(note, '8n', Tone.now());
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    },
    [audioState.initialized],
  );

  useEffect(() => {
    initializeAudio();
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        console.log('Effect: Tone.Synth disposed.');
      }
      setAudioState({
        initialized: false,
        starting: false,
        mute: false,
        error: null,
      });
    };
  }, []);

  const value = useMemo(
    () => ({
      ready: audioState.initialized,
      starting: audioState.starting,
      mute: audioState.mute,
      error: audioState.error,
      initializeAudio,
      playSignalSound,
      muteOutput,
    }),
    [audioState, initializeAudio, playSignalSound, muteOutput],
  );

  return <ToneContext.Provider value={value}>{children}</ToneContext.Provider>;
};

export function useTone() {
  const ctx = useContext(ToneContext);

  if (!ctx) panic("useContext was used out of Provider's bounds");
  return ctx!;
}
