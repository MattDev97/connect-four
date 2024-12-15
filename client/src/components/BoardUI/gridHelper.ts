const generatePixelGrid = (cellSize: number, board: number[][], offsetX: number, offsetY: number) => {
    const grid = [];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            grid.push({
                cellSize: cellSize,
                x: col * cellSize,
                y: row * cellSize,
                rowIndex: row,
                colIndex: col,
                player: board[row][col]
            });
        }
    }

    return grid;
};

export const generateGrid = (svgDimensions: { width: number; height: number }, board: number[][], columns: number, rows: number) => {
    if (svgDimensions.width > 0 && board.length > 0) {
        const cellSize = svgDimensions.width / columns;
        const offsetX = (svgDimensions.width - cellSize * columns) / 2; // Center horizontally
        const offsetY = (svgDimensions.height - cellSize * rows) / 2; // Center vertically
        return generatePixelGrid(cellSize, board, offsetX, offsetY);
    }
    return [];
};

