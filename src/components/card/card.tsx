import { FC, ReactNode } from 'react';

type ChildrenProps = { children: ReactNode | ReactNode[] };
type HeaderProps = {
  level: number;
  message: string;
};

const Root: FC<ChildrenProps> = ({ children }) => (
  <div className="bg-gray-700 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
    {children}
  </div>
);
const Header: FC<HeaderProps> = ({ level, message }) => (
  <>
    <header className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-teal-400">Memo Me</h1>
      <p className="text-gray-300 mt-2 text-lg">Level: {level}</p>
    </header>
    <div className="mb-6 h-12 flex items-center justify-center">
      <p className="text-xl text-yellow-300">{message}</p>
    </div>
  </>
);

const [Body, Footer]: [FC<ChildrenProps>, FC<ChildrenProps>] = [
  ({ children }) => <>{children}</>,
  ({ children }) => <>{children}</>,
];

export const Card = {
  Root,
  Header,
  Body,
  Footer,
};
