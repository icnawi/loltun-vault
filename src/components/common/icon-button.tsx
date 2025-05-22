import { FC, ReactElement } from 'react';

type IconButtonProps = {
  children: ReactElement;
  onClick: () => void;
  title: string;
};

export const IconButton: FC<IconButtonProps> = ({ children, title, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`btn btn-sm w-10 h-10 inline-flex items-center justify-center bg-transparent hover:bg-teal-600 border border-teal-500 hover:border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-200 ease-in-out shadow-sm hover:shadow-md`}>
      {children}
    </button>
  );
};
