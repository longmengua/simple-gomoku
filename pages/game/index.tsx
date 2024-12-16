import React, { useState } from "react";
import styles from "../../styles/Gomoku.module.css";
import { Cell } from "@/widgets/cell";

type Player = "Black" | "White" | null;

type Board = Player[][];

const BOARD_SIZE = 15;
const WINNING_CONDITION = 5;

const Gomoku: React.FC = () => {
  const [board, setBoard] = useState<Board>(
    Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>("Black");
  const [winner, setWinner] = useState<Player>(null);

  const handleCellClick = (row: number, col: number) => {
    if (winner || board[row][col]) return;

    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
    );
    console.log('newBoard', newBoard)
    setBoard(newBoard);

    if (checkWinner(newBoard, row, col, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === "Black" ? "White" : "Black");
    }
  };

  const checkWinner = (
    board: Board,
    row: number,
    col: number,
    player: Player
  ): boolean => {
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal (top-left to bottom-right)
      [1, -1], // Anti-diagonal (top-right to bottom-left)
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      let r = row + dx,
        c = col + dy;

      while (isValid(r, c) && board[r][c] === player) {
        count++;
        r += dx;
        c += dy;
      }

      r = row - dx;
      c = col - dy;
      while (isValid(r, c) && board[r][c] === player) {
        count++;
        r -= dx;
        c -= dy;
      }

      if (count >= WINNING_CONDITION) return true;
    }

    return false;
  };

  const isValid = (row: number, col: number): boolean => {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  };

  const resetGame = () => {
    setBoard(
      Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))
    );
    setCurrentPlayer("Black");
    setWinner(null);
  };

  return (
    <div className={styles.container}>
      <h1>Gomoku</h1>
      {winner ? (
        <h2>Player {winner} wins!</h2>
      ) : (
        <h2>Current Player: {currentPlayer}</h2>
      )}
      <div className={styles.board}>
        {board.map((row, i) => (
          <div key={i} className={styles.row}>
            {row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={styles.cell}
                onClick={() => handleCellClick(i, j)}
              >
                <Cell style={{ 
                  backgroundColor: cell == "Black" ? 'black' : cell == "White" ? 'hite' : 'transparent',
                  borderColor: ["Black", "White"].includes(cell ?? '') ? 'black' : 'transparent',
                }} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Gomoku;
