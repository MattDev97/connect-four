import React, { useRef, useEffect, useState } from 'react';

import { ReactComponent as BoardFront } from '../../assets/board-front.svg';
import { ReactComponent as BoardBack } from '../../assets/board-back.svg';

import { ReactComponent as CounterYellow } from '../../assets/counter-yellow.svg';
import { ReactComponent as CounterRed } from '../../assets/counter-red.svg';

import { ReactComponent as HoverCursorPlayerOne } from '../../assets/player-one-column-indicator.svg';
import { ReactComponent as HoverCursorPlayerTwo } from '../../assets/player-two-column-indicator.svg';

import { generateGrid } from './gridHelper';
import styles from './BoardUI.module.css';

type BoardUIProps = {
	board?: number[][];
	onMove: (row: number, col: number) => void;
	currentPlayer?: number;
	playerNumber?: number;
	isCurrentPlayer?: () => boolean;
};

function BoardUI({board, onMove, currentPlayer, playerNumber = -1, isCurrentPlayer = () => false} : BoardUIProps): JSX.Element {
	const rows = 6;
	const columns = 7;

	const boardFrontRef = useRef<SVGSVGElement>(null);
	const hoverCursorRef = useRef<SVGSVGElement>(null);
	const [grid, setGrid] = useState<{ x: number; y: number; cellSize: number; rowIndex: number; colIndex: number; player: number }[]>([]);
	const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

	useEffect(() => {
		if (board && boardFrontRef.current) {
			const { width, height } = boardFrontRef.current.getClientRects()[0]
			setGrid(generateGrid({ width, height }, board, columns, rows));
		}
	}, [board]);

	useEffect(() => {
		if (hoverCursorRef.current) {
			hoverCursorRef.current.style.left = hoveredColumn ? `${hoveredColumn * 100 / columns}%` : '0';
			hoverCursorRef.current.style.visibility = hoveredColumn != null ? 'visible' : 'hidden';
		}
	}, [hoveredColumn]);

	// useEffect(() => {
	// 	console.log(playerNumber + ' is currentPlayer: ' + currentPlayer);
	// 	if (playerNumber === currentPlayer) {
	// 		setIsCurrentPlayer(true);
	// 	} else {
	// 		setIsCurrentPlayer(false);
	// 	}
	// }, [playerNumber]);


	const handleMove = (row: number, col: number) => {
		if(!isCurrentPlayer()) return;
		onMove(row, col); // Call the callback function passed from the parent component
	};

	const handleMouseEnter = (col: number) => {
		setHoveredColumn(col);
	};
	
	  const handleMouseLeave = () => {
		setHoveredColumn(null);
	};

	return (
		<div className={styles["board-wrapper"]}>
			{(isCurrentPlayer() && currentPlayer == 1) && <HoverCursorPlayerOne className={styles["hover-cursor"]} ref={hoverCursorRef}/>}
			{(isCurrentPlayer() && currentPlayer == 2) && <HoverCursorPlayerTwo className={styles["hover-cursor"]} ref={hoverCursorRef}/>}

			<div className={styles["board-front"]}>
				<BoardFront ref={boardFrontRef} />
			</div>
			<BoardBack />
			<div className={styles["grid"]}>
				{grid && grid.map((cell, index) => (
					<div
						data-active={isCurrentPlayer()}
						data-col={cell.colIndex}
						onClick={() => handleMove(cell.rowIndex, cell.colIndex)}
						onMouseEnter={() => handleMouseEnter(cell.colIndex)}
            			onMouseLeave={handleMouseLeave}
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
						{cell.player === 1 && <CounterRed />}
						{cell.player === 2 && <CounterYellow />}
					</div>
				))}
			</div>

		</div>
	);
}

export default BoardUI;