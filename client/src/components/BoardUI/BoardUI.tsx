import React, { useRef, useEffect, useState } from 'react';

import { ReactComponent as BoardFront } from '../../assets/board-front.svg';
import { ReactComponent as BoardBack } from '../../assets/board-back.svg';

import { ReactComponent as CounterYellow } from '../../assets/counter-yellow.svg';
import { ReactComponent as CounterRed } from '../../assets/counter-red.svg';

import { generateGrid } from './gridHelper';
import styles from './BoardUI.module.css';

type BoardUIProps = {
	board?: number[][];
	onMove: (row: number, col: number) => void;
};

function BoardUI({board, onMove} : BoardUIProps): JSX.Element {
	const rows = 6;
	const columns = 7;

	const boardFrontRef = useRef<SVGSVGElement>(null);
	const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
	const [grid, setGrid] = useState<{ x: number; y: number; cellSize: number; rowIndex: number; colIndex: number; player: number }[]>([]);

	useEffect(() => {
		console.log('Generating Grid');
		if (board && boardFrontRef.current) {
			const { width, height } = boardFrontRef.current.getClientRects()[0]
			setSvgDimensions({ width, height });
			setGrid(generateGrid({ width, height }, board, columns, rows));
		}
	}, [board]);

	const handleMove = (row: number, col: number) => {
		onMove(row, col); // Call the callback function passed from the parent component
	};

	return (
		<div className={styles["board-wrapper"]}>

			<div className={styles["board-front"]}>
				<BoardFront ref={boardFrontRef} />
			</div>
			<BoardBack />
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
						{cell.player === 1 && <CounterRed />}
						{cell.player === 2 && <CounterYellow />}
					</div>
				))}
			</div>

		</div>
	);
}

export default BoardUI;