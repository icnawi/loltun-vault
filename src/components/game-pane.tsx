import { FC, ReactNode } from 'react';
type GamePaneProps = {
  children: ReactNode[];
};
export const GamePane: FC<GamePaneProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4 font-sans select-none">
    {children}
  </div>
);
