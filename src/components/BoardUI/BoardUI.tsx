import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as BoardFront } from '../../assets/board-front.svg';
import { ReactComponent as BoardBack } from '../../assets/board-back.svg';

import { ReactComponent as CounterYellow } from '../../assets/counter-yellow.svg';
import { ReactComponent as CounterRed } from '../../assets/counter-red.svg';

import { useGameContext } from '../../context/GameContext';

import styles from './BoardUI.module.css';

const generatePixelGrid = (cellSize: number, board: number[][], offsetX: number, offsetY: number) => {
	const grid = [];
	
	for (let row = 0; row < board.length; row++) {
	  for (let col = 0; col < board[row].length; col++) {
		grid.push({
			cellSize: cellSize,
			x: col * cellSize,
			y: row * cellSize,
			rowIndex : row,
			colIndex : col,
			player : board[row][col]
		});
	  }
	}
  
	return grid;
};

function BoardUI(): JSX.Element {
	const { gameCode, generateGameCode, board, initializeBoard, updateBoard, currentPlayer} = useGameContext();
	const location = useLocation();
	initializeBoard();

	const rows = 6;
	const columns = 7;

	const boardFrontRef = useRef<SVGSVGElement>(null);
	const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
	const [grid, setGrid] = useState<{ x: number; y: number; cellSize: number; rowIndex: number; colIndex: number; player: number }[]>([]);
	useEffect(() => {
		if (boardFrontRef.current) {
			initializeBoard();
			const { width, height } = boardFrontRef.current.getClientRects()[0]
      		setSvgDimensions({ width, height });

			if (svgDimensions.width > 0 && board.length > 0) {
				const cellSize = svgDimensions.width / columns;
				const offsetX = (svgDimensions.width - cellSize * columns) / 2; // Center horizontally
				const offsetY = (svgDimensions.height - cellSize * rows) / 2; // Center vertically
				const newGrid = generatePixelGrid(cellSize, board, offsetX, offsetY);
				setGrid(newGrid);
			}
			
		}
		
	}, [initializeBoard, location]);

	useEffect(() => {
		if (boardFrontRef.current) {
		  const { width, height } = boardFrontRef.current.getBBox();
		  setSvgDimensions({ width, height });
		}
	}, []);

	useEffect(() => {
		if (svgDimensions.width > 0 && board.length > 0) {
		  const cellSize = svgDimensions.width / columns;
		  const offsetX = (svgDimensions.width - cellSize * columns) / 2; // Center horizontally
		  const offsetY = (svgDimensions.height - cellSize * rows) / 2; // Center vertically
		  const newGrid = generatePixelGrid(cellSize, board, offsetX, offsetY);
		  setGrid(newGrid);
		}
	}, [svgDimensions, board, columns, rows]);

	const handleMove = (row: number, col: number) => {
		updateBoard(col, currentPlayer); // Example: Player 1 makes a move
	};

	return (
		<div className={styles["board-wrapper"]}>
			
			<div className={styles["board-front"]}>
				<BoardFront ref={boardFrontRef} />
			</div>
			<BoardBack/>
			<div className={styles["grid"]}>
				{grid && grid.map((cell, index) => (
					<div
						onClick={() => handleMove(cell.rowIndex, cell.colIndex)}
						key={index}
						className={styles["grid-cell"]}
						style={{
							position: 'absolute',
							width: `${cell.cellSize}px`, // Example cell size, adjust as needed
							height: `${cell.cellSize}px`, // Example cell size, adjust as needed
							left: `${cell.x}px`,
							top: `${cell.y}px` // Example color, adjust as needed
						}}
					>	
						{cell.player === 1 && <CounterRed/>}
						{cell.player === 2 && <CounterYellow/>}
					</div>
				))}
			</div>
			
		</div>
  );
}

export default BoardUI;