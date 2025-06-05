import React, { useEffect, useState } from "react";
import Board from "./Board";
import LabelInput from "./core/LabelInput";
import Button from "./core/Button";

const ConnectFour: React.FC = () => {
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
    for (let r = 0; r < ROWS - 3; r++) {
      for (let c = 0; c < COLS; c++) {
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
    for (let r = 0; r < ROWS - 3; r++) {
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

    //   //Negative Slope (diagonal)
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

    //   //draw
    if (board.every((row) => row.every((cell) => cell !== null))) {
      return "Draw";
    }
    return null;
  };

  const [board, setBoard] = useState<(string | null)[][]>(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"P1" | "P2">("P1");
  const [winner, setWinner] = useState<string | null>(null);
  const [player1Name, setPlayer1Name] = useState<string>("");
  const [player2Name, setPlayer2Name] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
    }
  }, [board]);

  const handleDrop = (col: number) => {
    if (winner || !gameStarted) return; // No moves if game over or not started

    const newBoard = board.map((row) => [...row]);
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!newBoard[r][col]) {
        newBoard[r][col] = currentPlayer;
        console.log(newBoard);
        setBoard(newBoard);
        const result = checkWinner(newBoard);
        if (result) {
          setWinner(result);
        } else {
          setCurrentPlayer(currentPlayer === "P1" ? "P2" : "P1");
        }
        break;
      }
    }
  };

  const startGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      setGameStarted(true);
    } else {
      alert("Please enter names for both players!");
    }
  };

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer("P1");
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Connect Four</h1>

      {!gameStarted ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <LabelInput
            label=" Player 1 Name:"
            playerName={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Enter Player 1 name"
          />
          <LabelInput
            label=" Player 2 Name:"
            playerName={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Enter Player 2 name"
          />
          <Button onClick={startGame} title="Start Game" />
        </div>
      ) : (
        <>
          <div className="mb-4 text-xl font-semibold text-gray-700">
            {winner
              ? winner === "Draw"
                ? "It's a Draw!"
                : `Winner: ${winner === "P1" ? player1Name : player2Name}!`
              : `Current Player: ${
                  currentPlayer === "P1" ? player1Name : player2Name
                }`}
          </div>
          <Board board={board} onDrop={handleDrop} isDarkTheme={isDarkTheme} />
          <Button onClick={resetGame} title="Reset Game" />
        </>
      )}
    </div>
  );
};

export default ConnectFour;
