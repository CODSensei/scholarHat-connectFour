import React, { useEffect, useState } from "react";
import Board from "./Board";
import LabelInput from "./core/LabelInput";
import Button from "./core/Button";
import clickSound from "../assets/sounds/click.mp3";
import winSound from "../assets/sounds/success.mp3";
import drawSound from "../assets/sounds/losing-horn-313723.mp3";

const ConnectFour: React.FC = () => {
  const ROWS = 6;
  const COLS = 7;

  const createBoard = (): (string | null)[][] => {
    return Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null));
  };

  const playAudio = (audio: any) => {
    new Audio(audio).play();
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
      if (result === "Draw") {
        try {
          playAudio(drawSound);
        } catch (err) {
          console.log("Draw sound error:", err);
        }
      } else {
        try {
          playAudio(winSound);
        } catch (err) {
          console.log("Win sound error:", err);
        }
      }
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
        try {
          playAudio(clickSound);
        } catch (err) {
          console.log("Click sound error:", err);
        }

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

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
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
    // <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex flex-col items-center justify-center p-4">
    //   <h1 className="text-4xl font-bold text-gray-800 mb-4">Connect Four</h1>
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden ${
        isDarkTheme ? "bg-black" : "bg-gradient-to-br from-gray-100 to-blue-100"
      }`}
    >
      <Button
        buttonCSS={`mb-6 px-6 py-2 font-semibold rounded-lg shadow-lg transition-all ${
          isDarkTheme
            ? "bg-gray-800 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:bg-gray-700"
            : "bg-blue-200 text-blue-600 border border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] hover:bg-blue-300"
        }`}
        onClick={toggleTheme}
        title={`Toggle ${isDarkTheme ? "Light" : "Dark"} Theme`}
      />
      {/* Neon background effects */}
      <div className="absolute w-96 h-96 bg-cyan-400 opacity-30 blur-3xl rounded-full -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-pink-500 opacity-30 blur-3xl rounded-full -bottom-20 -right-20 animate-pulse"></div>
      {/* <div className="absolute w-64 h-64 bg-lime-400 opacity-20 blur-3xl rounded-full top-1/3 left-1/2 animate-pulse"></div> */}

      <h1
        className={`text-5xl font-bold underline text-center mb-5 ${
          isDarkTheme
            ? "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            : "text-blue-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        }`}
      >
        Connect Four
      </h1>

      {!gameStarted ? (
        // <div className="bg-white p-6 rounded-lg shadow-md w-96 border border-blue-500">
        <div
          className={`p-6 rounded-lg shadow-lg w-96 ${
            isDarkTheme
              ? "bg-gray-900 text-cyan-300 shadow-[0_0_15px_rgba(236,72,153,0.6)]"
              : "bg-gray-100 text-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.4)]"
          }`}
        >
          <LabelInput
            label=" Player 1 Name:"
            playerName={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Enter Player 1 name"
            labelCSS={`block font-semibold mb-2 ${
              isDarkTheme ? "text-cyan-300" : "text-blue-600"
            }`}
            inputCSS={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              isDarkTheme
                ? "bg-gray-800 text-cyan-300 border-cyan-400 focus:ring-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                : "bg-white text-blue-600 border-blue-500 focus:ring-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
            }`}
          />
          <LabelInput
            label=" Player 2 Name:"
            playerName={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Enter Player 2 name"
            labelCSS={`block font-semibold mb-2 ${
              isDarkTheme ? "text-cyan-300" : "text-blue-600"
            }`}
            inputCSS={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              isDarkTheme
                ? "bg-gray-800 text-cyan-300 border-cyan-400 focus:ring-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                : "bg-white text-blue-600 border-blue-500 focus:ring-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
            }`}
          />
          <Button
            buttonCSS={`w-full px-6 py-2 font-semibold rounded-lg shadow-lg transition-all ${
              isDarkTheme
                ? "bg-cyan-400 text-gray-900 border border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:bg-cyan-300"
                : "bg-blue-500 text-white border border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)] hover:bg-blue-600"
            }`}
            onClick={startGame}
            title="Start Game"
          />
        </div>
      ) : (
        <>
          <div
            className={`mb-4 text-xl font-semibold ${
              isDarkTheme
                ? "text-lime-400 drop-shadow-[0_0_10px_rgba(132,204,22,0.7)]"
                : "text-blue-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
            }`}
          >
            {winner
              ? winner === "Draw"
                ? "It's a Draw!"
                : `Winner: ${winner === "P1" ? player1Name : player2Name}!`
              : `Current Player: ${
                  currentPlayer === "P1" ? player1Name : player2Name
                }`}
          </div>
          <Board board={board} onDrop={handleDrop} isDarkTheme={isDarkTheme} />
          <Button
            buttonCSS={`mt-6 px-6 py-2 font-semibold rounded-lg shadow-lg transition-all ${
              isDarkTheme
                ? "bg-lime-400 text-gray-900 border border-lime-300 shadow-[0_0_15px_rgba(132,204,22,0.7)] hover:bg-lime-300"
                : "bg-blue-500 text-white border border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)] hover:bg-blue-600"
            }`}
            onClick={resetGame}
            title="Reset Game"
          />
          {winner && (
            <div
              className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50`}
            >
              <div
                className={`p-8 rounded-lg shadow-lg text-center ${
                  isDarkTheme
                    ? "bg-gray-900 text-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.7)]"
                    : "bg-gray-100 text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                }`}
              >
                <h2
                  className={`text-3xl font-bold mb-4 ${
                    isDarkTheme
                      ? "text-lime-400 drop-shadow-[0_0_10px_rgba(132,204,22,0.7)]"
                      : "text-blue-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                  }`}
                >
                  {winner === "Draw"
                    ? "It's a Draw!"
                    : `Winner: ${winner === "P1" ? player1Name : player2Name}!`}
                </h2>
                <button
                  className={`px-6 py-2 font-semibold rounded-lg shadow-lg transition-all ${
                    isDarkTheme
                      ? "bg-cyan-400 text-gray-900 border border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:bg-cyan-300"
                      : "bg-blue-500 text-white border border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)] hover:bg-blue-600"
                  }`}
                  onClick={resetGame}
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConnectFour;
