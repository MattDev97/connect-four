import React, { useRef, useEffect, useState } from 'react';

import { ReactComponent as BoardFront } from '../../assets/board-front.svg';
import { ReactComponent as BoardBack } from '../../assets/board-back.svg';

import styles from './BoardUI.module.css';

const generatePixelGrid = (cellSize : number, rows : number, columns : number) => {
	const grid = [];
  
	for (let row = 0; row < rows; row++) {
	  for (let col = 0; col < columns; col++) {
		grid.push({
			cellSize: cellSize,
			x: col * cellSize,
			y: row * cellSize,
		});
	  }
	}
  
	return grid;
};

function BoardUI(): JSX.Element {
	const rows = 6;
	const columns = 7;

	const boardFrontRef = useRef<SVGSVGElement>(null);
	const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
	const [grid, setGrid] = useState<{ x: number; y: number, cellSize : number }[]>([]);

	useEffect(() => {
		if (boardFrontRef.current) {
			const { width, height } = boardFrontRef.current.getBBox();
			setSvgDimensions({ width, height });
			const cellSize = width / columns;
			const newGrid = generatePixelGrid(cellSize, rows, columns);
			setGrid(newGrid);
			console.log(newGrid);
		}
	}, []);

	return (
		<div className={styles["board-wrapper"]}>
			
			<div className={styles["board-front"]}>
				<BoardFront ref={boardFrontRef} />
			</div>
			<BoardBack/>
			<div className={styles["grid"]}>
				{grid && grid.map((cell, index) => (
					<div
						key={index}
						className={styles["grid-cell"]}
						style={{
							position: 'absolute',
							width: `${cell.cellSize}px`, // Example cell size, adjust as needed
							height: `${cell.cellSize}px`, // Example cell size, adjust as needed
							left: `${cell.x}px`,
							top: `${cell.y}px`,
							backgroundColor: 'rgba(0, 0, 0, 0.1)', // Example color, adjust as needed
						}}
					/>
				))}
			</div>
			
		</div>
  );
}

export default BoardUI;