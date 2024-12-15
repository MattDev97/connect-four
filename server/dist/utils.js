"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWinner = void 0;
const checkWinner = (board, row, col, player) => {
    const rows = board.length;
    const cols = board[0].length;
    // Check horizontal win
    let count = 0;
    for (let c = Math.max(0, col - 3); c < Math.min(cols, col + 4); c++) {
        count = (board[row][c] === player) ? count + 1 : 0;
        if (count >= 4)
            return true;
    }
    // Check vertical win
    count = 0;
    for (let r = Math.max(0, row - 3); r < Math.min(rows, row + 4); r++) {
        count = (board[r][col] === player) ? count + 1 : 0;
        if (count >= 4)
            return true;
    }
    // Check diagonal (bottom-left to top-right) win
    count = 0;
    for (let offset = -3; offset <= 3; offset++) {
        const r = row + offset;
        const c = col + offset;
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            count = (board[r][c] === player) ? count + 1 : 0;
            if (count >= 4)
                return true;
        }
    }
    // Check diagonal (top-left to bottom-right) win
    count = 0;
    for (let offset = -3; offset <= 3; offset++) {
        const r = row - offset;
        const c = col + offset;
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            count = (board[r][c] === player) ? count + 1 : 0;
            if (count >= 4)
                return true;
        }
    }
    return false;
};
exports.checkWinner = checkWinner;
