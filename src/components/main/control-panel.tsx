import { FC, ReactElement, ReactNode } from 'react';
import { useGameConfig } from '../../context/game-config';
import { GameplayPhase } from '../../constants';
import { StartButton } from './buttons/start.tsx';
import { LastSequenceButton } from './buttons/last.tsx';
import { EnduranceModeButton } from './buttons/endurance.tsx';
import { LevelSelectButton } from './buttons/level.tsx';
import { GameModeButton } from './buttons/game-mode.tsx';

type FlexRowProps = {
  children: ReactNode | ReactElement | ReactElement[];
  className?: string;
};

export const FlexRow: FC<FlexRowProps> = ({ children, className = '' }) => (
  <div className={`flex flex-row justify-center ${className}`}>{children}</div>
);

export const ColumnRow: FC<FlexRowProps> = ({ children, className = '' }) => (
  <div className={`flex flex-col justify-center ${className}`}>{children}</div>
);

export const ControlPanel: FC = () => {
  const { gamePhase, startGame } = useGameConfig();

  return (
    <>
      {gamePhase === GameplayPhase.IDLE || gamePhase === GameplayPhase.GAMEOVER ? (
        <>
          <LastSequenceButton onPlayLast={() => {}} />
          <LevelSelectButton
            onSelectLevel={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <StartButton
            onStart={startGame}
            title={gamePhase === 'gameover' ? 'Restart' : 'Start Game'}
          />
          <GameModeButton
            onSetGameMode={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <EnduranceModeButton onPlayLongest={() => {}} />
        </>
      ) : null}
    </>
  );
};
