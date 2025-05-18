import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface MessageContextData {
  msg: string | null;
  setMsg: Dispatch<SetStateAction<string>>;
}
const MessageContext = createContext<MessageContextData | null>(null);

type MessageProviderProps = {
  children: ReactNode;
};
export const MessageProvider: FC<MessageProviderProps> = ({ children }) => {
  const [msg, setMsg] = useState('Click "Start Game" to begin!');
  const value = {
    msg,
    setMsg,
  };

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

export function useMessage() {
  return useContext(MessageContext)!;
}
