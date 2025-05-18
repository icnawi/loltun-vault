import { FC } from 'react';
import { useGameConfig } from '../../context/game-config';
import { ColorPad } from '../../types';
import { PadItem } from './pad-item';

export const PadList: FC = () => {
  const { config } = useGameConfig();
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {config.map((pad: ColorPad) => (
        <PadItem key={pad.id} pad={pad} />
      ))}
    </div>
  );
};
