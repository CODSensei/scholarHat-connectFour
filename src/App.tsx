import React, { useEffect, useState } from "react";
import Board from "./components/Board";

const ROWS = 6;
const COLS = 7;

const createBoard = (): (string | null)[][] => {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null));
};

const checkWinner = (board: (string | null)[][]): string | null => {
  //Horizontal
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r][c + 1] &&
        board[r][c] === board[r][c + 2] &&
        board[r][c] === board[r][c + 3]
      ) {
        return board[r][c];
      }
    }
  }

  //Vertical
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r + 1][c] &&
        board[r][c] === board[r + 2][c] &&
        board[r][c] === board[r + 3][c]
      ) {
        return board[r][c];
      }
    }
  }

  //Positive Slope (diagonal)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r + 1][c + 1] &&
        board[r][c] === board[r + 2][c + 2] &&
        board[r][c] === board[r + 3][c + 3]
      ) {
        return board[r][c];
      }
    }
  }

  //Negative Slope (diagonal)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      if (
        board[r][c] &&
        board[r][c] === board[r - 1][c + 1] &&
        board[r][c] === board[r - 2][c + 2] &&
        board[r][c] === board[r - 3][c + 3]
      ) {
        return board[r][c];
      }
    }
  }

  //draw
  if (board.every((row) => row.every((cell) => cell !== null))) {
    return "Draw";
  }
  return null;
};

const App: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[][]>(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"R" | "Y">("R");
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
    }
  }, [board]);

  const handleDrop = (col: number) => {
    if (winner) return;

    const newBoard = board.map((row) => [...row]);
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!newBoard[r][col]) {
        newBoard[r][col] = currentPlayer;
        setBoard(newBoard);
        const result = checkWinner(newBoard);
        if (result) {
          setWinner(result);
        } else {
          setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
        }
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer("R");
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Connect Four</h1>
      <div className="mb-4 text-xl font-semibold text-gray-700">
        {winner
          ? winner === "Draw"
            ? "It's a Draw!!"
            : `Player ${winner === "R" ? "Red" : "Yellow"} Wins!`
          : `Current Player: ${currentPlayer === "R" ? "Red" : "Yellow"}`}
      </div>
      <Board board={board} onDrop={handleDrop} />
      <button
        className="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-2xl hover:bg-green-600 transition"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default App;
