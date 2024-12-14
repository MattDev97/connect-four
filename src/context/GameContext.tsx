import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GameContextProps {
	gameCode: string;
	currentPlayer : number;
	generateGameCode: () => void;
	board: number[][];
	initializeBoard: () => void;
	updateBoard: (row: number, col: number, player: number) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [gameCode, setGameCode] = useState<string>('');
	const [board, setBoard] = useState<number[][]>([]);
	const [currentPlayer, setCurrentPlayer] = useState<number>(1);

	const generateGameCode = () => {
		const newGameCode = Math.random().toString(36).substr(2, 5).toUpperCase();
		setGameCode(newGameCode);
	};

	const initializeBoard = () => {
		const newBoard = Array(6).fill(null).map(() => Array(7).fill(0));
		setBoard(newBoard);
	};

	const updateBoard = (row: number, col: number, player: number) => {
		setBoard(prevBoard => {
			const newBoard = prevBoard.map(row => row.slice());
			newBoard[row][col] = player;
			console.log(newBoard);
			
			return newBoard;
		});
		setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
	};

	return (
		<GameContext.Provider value={{ gameCode, generateGameCode, board, initializeBoard, updateBoard, currentPlayer }}>
			{children}
		</GameContext.Provider>
	);
};

export const useGameContext = () => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error('useGameContext must be used within a GameContextProvider');
	}
	return context;
};