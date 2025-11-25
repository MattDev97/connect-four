import React, { createContext, useEffect, useState, useContext, ReactNode, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io(process.env.REACT_APP_CONNECT_FOUR_URL); // Update with your backend URL in production

interface GameContextProps {
	gameCode: string;
	currentPlayer: number;
	board: number[][];
	playerOneScore?: number;
	playerTwoScore?: number;
	playerNumber?: number;
	socketUserId?: string;
	playerOneConnected?: boolean;
	playerTwoConnected?: boolean;
	currentRooms?: string[];
	updateBoard?: (col: number, player: number) => void;
	generateGameCode: () => string;
	setGameCode: (gameCode: string) => void;
	isCurrentPlayer: () => boolean;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [gameCode, setGameCode] = useState<string>('');
	const [board, setBoard] = useState<number[][]>([]);
	const [playerNumber, setPlayerNumber] = useState<number>(1);
	const [currentPlayer, setCurrentPlayer] = useState<number>(1);

	const [playerOneScore, setPlayerOneScore] = useState<number>(0);
	const [playerTwoScore, setPlayerTwoScore] = useState<number>(0);

	const [playerOneConnected, setPlayerOneConnected] = useState<boolean>(false);
	const [playerTwoConnected, setPlayerTwoConnected] = useState<boolean>(false);

	const [currentRooms, setCurrentRooms] = useState<string[]>([]);

	const generateGameCode = () => {
		const newGameCode = Math.random().toString(36).substr(2, 5).toUpperCase();
		return newGameCode;
	};

	const isCurrentPlayer = useCallback(() => {
		return playerNumber === currentPlayer;
	}, [playerNumber, currentPlayer]);

	const updateBoard = (col: number, player: number) => {
		socket.emit('playerMove', gameCode, col, socket.id);
	}

	useEffect(() => {
		socket.on('gameState', (state: any) => {
			// Update context state with the received game state
			setBoard(state.board);
			setCurrentPlayer(state.currentPlayer);
			setPlayerOneScore(state.playerOneScore);
			setPlayerTwoScore(state.playerTwoScore);
			setPlayerOneConnected(state.playerOneConnected);
			setPlayerTwoConnected(state.playerTwoConnected);
		});

		socket.on('getPlayerNumber', (playerNumber: number) => {
			setPlayerNumber(playerNumber);
		});
	}, []);

	useEffect(() => {
		if (gameCode) {
			socket.emit('leaveRooms', currentRooms);
			socket.emit('joinRoom', gameCode);

			setCurrentRooms([gameCode]);
		} else {
			socket.emit('leaveRooms', currentRooms);
		}
	}, [gameCode]);

	return (
		<GameContext.Provider value={{ updateBoard, isCurrentPlayer, playerNumber, playerOneConnected, playerTwoConnected, gameCode, generateGameCode, setGameCode, board, currentPlayer, playerOneScore, playerTwoScore }}>
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