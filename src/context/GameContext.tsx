import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface GameContextProps {
	gameCode: string;
	currentPlayer : number;
	generateGameCode: () => void;
	board: number[][];
	initializeBoard: () => void;
	updateBoard: (col: number, player: number) => void;
	playerOneScore?: number;
	playerTwoScore?: number;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [gameCode, setGameCode] = useState<string>('');
	const [board, setBoard] = useState<number[][]>([]);
	const [currentPlayer, setCurrentPlayer] = useState<number>(1);

	const [playerOneScore, setPlayerOneScore] = useState<number>(0);
	const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);

	const generateGameCode = () => {
		const newGameCode = Math.random().toString(36).substr(2, 5).toUpperCase();
		setGameCode(newGameCode);
	};

	const initializeBoard = useCallback(() => {
		const newBoard = Array(6).fill(null).map(() => Array(7).fill(0));
		setBoard(newBoard);
	}, []);

	const updateBoard = (col: number, player: number) => {
		setBoard(prevBoard => {
			const newBoard = prevBoard.map(row => row.slice());
			let row = -1;
			for (let r = newBoard.length - 1; r >= 0; r--) {
				if (newBoard[r][col] === 0) {
					newBoard[r][col] = player;
					row = r;
					break;
				}
			}

			if (row !== -1 && checkWinner(newBoard, row, col, player)) {
				console.log(`Player ${player} wins!`);
				if (player === 1) {
					setPlayerOneScore(prevScore => prevScore + 1);
				} else {
					setPlayerTwoScore(prevScore => prevScore + 1);
				}
				setCurrentPlayer(1);
				return Array(6).fill(null).map(() => Array(7).fill(0));
			}

			setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
			
			return newBoard;
		});
		
	};

	const checkWinner = (board: number[][], row: number, col: number, player: number) => {
		const rows = board.length;
		const cols = board[0].length;

		// Check horizontal win
		let count = 0;
		for (let c = Math.max(0, col - 3); c < Math.min(cols, col + 4); c++) {
		count = (board[row][c] === player) ? count + 1 : 0;
		if (count >= 4) return true;
		}

		// Check vertical win
		count = 0;
		for (let r = Math.max(0, row - 3); r < Math.min(rows, row + 4); r++) {
		count = (board[r][col] === player) ? count + 1 : 0;
		if (count >= 4) return true;
		}

		// Check diagonal (bottom-left to top-right) win
		count = 0;
		for (let offset = -3; offset <= 3; offset++) {
		const r = row + offset;
		const c = col + offset;
		if (r >= 0 && r < rows && c >= 0 && c < cols) {
			count = (board[r][c] === player) ? count + 1 : 0;
			if (count >= 4) return true;
		}
		}

		// Check diagonal (top-left to bottom-right) win
		count = 0;
		for (let offset = -3; offset <= 3; offset++) {
		const r = row - offset;
		const c = col + offset;
		if (r >= 0 && r < rows && c >= 0 && c < cols) {
			count = (board[r][c] === player) ? count + 1 : 0;
			if (count >= 4) return true;
		}
		}

		return false;
	}

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