import { FC, ReactNode } from 'react';
import { useGameConfig } from '../../context/game-config';
import { double } from '../../utils';
import { FlexRow } from '../main/control-panel.tsx';
import { MuteButton } from '../mute/mute-button.tsx';

type ChildrenProps = { children: ReactNode | ReactNode[] };

const Root: FC<ChildrenProps> = ({ children }) => (
  <div className="bg-gray-700 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
    {children}
  </div>
);
const Header: FC = () => {
  const { level } = useGameConfig();
  return (
    <header className="mb-6">
      <FlexRow>
        <h1 className="text-3xl md:text-4xl font-bold text-teal-400">Memo Me</h1>
        <MuteButton />
      </FlexRow>

      <p className="text-gray-300 mt-2 text-lg">Level: {level}</p>
    </header>
  );
};

const [Body, Footer]: [FC<ChildrenProps>, FC<ChildrenProps>] = double(({ children }) => (
  <>{children}</>
));

export const Card = {
  Root,
  Header,
  Body,
  Footer,
};
