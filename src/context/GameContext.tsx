import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GameContextProps {
  gameCode: string;
  generateGameCode: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameCode, setGameCode] = useState<string>('');

  const generateGameCode = () => {
    const newGameCode = Math.random().toString(36).substr(2, 5).toUpperCase();
    setGameCode(newGameCode);
  };

  return (
    <GameContext.Provider value={{ gameCode, generateGameCode }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameCode = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameCode must be used within a GameCodeProvider');
  }
  return context;
};