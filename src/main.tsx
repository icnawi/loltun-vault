import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GameConfigProvider } from './context/game-config.tsx';
import { ToneProvider } from './context/tone.tsx';
import { MessageProvider } from './context/message.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToneProvider>
      <MessageProvider>
        <GameConfigProvider>
          <App />
        </GameConfigProvider>
      </MessageProvider>
    </ToneProvider>
  </StrictMode>,
);
