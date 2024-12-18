import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { checkWinner } from './utils';
interface RoomConnections {
  playerOneId: string | null;
  playerTwoId: string | null;
}
interface GameState {
  playerOneScore: number;
  playerTwoScore: number;
  currentPlayer: number;
  board: number[][]; // Replace with your board type
}
const gameStates: { [key: string]: GameState } = {};
const roomConnections: { [key: string]: RoomConnections } = {};

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// // Serve React App static files
// const reactBuildPath = path.join(__dirname, '../../client/build');
// app.use(express.static(reactBuildPath));

// // Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(reactBuildPath, 'index.html'));
// });

// Create an HTTP server to integrate with Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Update this with your frontend's actual origin in production
  },
});


// Set up Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', (gameCode: string) => {

    // Initialize game state if it doesn't exist
    if (!gameStates[gameCode]) {
      gameStates[gameCode] = {
        currentPlayer: 1,
        playerOneScore: 0,
        playerTwoScore: 0,
        board: Array(6).fill(null).map(() => Array(7).fill(0)), // Initialize your board state
      };

      roomConnections[gameCode] = {
        playerOneId: null,
        playerTwoId: null
      }
    }

    // Assign player to a slot if available
    const room = roomConnections[gameCode];
    if (!room.playerOneId) {
      room.playerOneId = socket.id;
    } else if (!room.playerTwoId) {
      room.playerTwoId = socket.id;
    }
    
    gameStates[gameCode].currentPlayer = room.playerOneId === socket.id ? 1 : 2;
    socket.join(gameCode);
    console.log(`User joined room: ${gameCode}`);

    // Send the current game state to the user
    io.to(gameCode).emit('gameState', gameStates[gameCode]);
  });

  socket.on('leaveRoom', (gameCode: string) => {
    socket.leave(gameCode);
    console.log(`User left room: ${gameCode}`);
  });

  socket.on('playerMove', (gameCode: string, col: number, socketUserId: string) => {
    let gameState = gameStates[gameCode];
    let room = roomConnections[gameCode];
    let newBoard = gameState.board.map((row) => row.slice());
    let player = gameState.currentPlayer === 1 ? room.playerOneId : room.playerTwoId;

    if (socketUserId !== player) {
      console.log(`Player ${player} is not allowed to move in room ${gameCode}`);
      return;
    }
    console.log(`Player ${player} moved on ${col} in room ${gameCode}`);

    let row = -1;
    for (let r = newBoard.length - 1; r >= 0; r--) {
      if (newBoard[r][col] === 0) {
        newBoard[r][col] = gameState.currentPlayer;
        row = r;
        break;
      }
    }

    if (row !== -1 && checkWinner(newBoard, row, col, gameState.currentPlayer)) {
      console.log(`Player ${gameState.currentPlayer} wins!`);
      if (gameState.currentPlayer === 1) {
        gameState.playerOneScore += 1;
      } else {
        gameState.playerTwoScore += 1;
      }
      gameState.currentPlayer = 1;
      newBoard = Array(6).fill(null).map(() => Array(7).fill(0));
    } else {
      gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    }
    
    gameStates[gameCode] = {
      ...gameState,
      board: newBoard,
    };

    console.log(`New Board state in ${gameCode}: ${JSON.parse(JSON.stringify(newBoard))}`);
    io.to(gameCode).emit('gameState', gameStates[gameCode]);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
