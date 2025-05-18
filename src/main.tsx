import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GameConfigProvider } from './context/game-config.tsx';
import { SynthProvider } from './context/synth.tsx';
import { MessageProvider } from './context/message.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SynthProvider>
      <MessageProvider>
        <GameConfigProvider>
          <App />
        </GameConfigProvider>
      </MessageProvider>
    </SynthProvider>
  </StrictMode>,
);
