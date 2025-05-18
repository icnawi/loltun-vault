import './App.css';
import { Card } from './components/card/card';
import { GamePane } from './components/game-pane';
import { ControlPanel } from './components/main/control-panel';
import { PadList } from './components/pads/pad-list';
import { useSynth } from './context/synth.tsx';

export default function App() {
  const { ready } = useSynth();

  // --- Render Game ---
  return (
    <GamePane>
      <Card.Root>
        <Card.Header />
        <Card.Body>
          <PadList />
        </Card.Body>
        <Card.Footer>
          <ControlPanel />
        </Card.Footer>
      </Card.Root>
      <footer className="text-center text-gray-400 mt-8 text-sm">
        <p>Remember the sequence of sights and sounds!</p>
        {!ready ? (
          <p className="text-red-400">Warning: Audio library (Tone.js) not loaded.</p>
        ) : null}
      </footer>
    </GamePane>
  );
}
