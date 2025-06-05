import type React from "react";
import Cell from "./Cell";

interface BoardProps {
  board: (string | null)[][];
  onDrop: (col: number) => void;
  isDarkTheme: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onDrop, isDarkTheme }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-lg ${
        isDarkTheme
          ? "bg-gray-900 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
          : "bg-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
      }`}
    >
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center">
          {row.map((col, colIdx) => (
            <Cell
              key={`${rowIdx} - ${colIdx}`}
              value={col}
              onClick={() => onDrop(colIdx)}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
