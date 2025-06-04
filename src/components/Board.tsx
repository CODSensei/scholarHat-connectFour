import type React from "react";
import Cell from "./Cell";

interface BoardProps {
  board: (string | null)[][];
  onDrop: (col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onDrop }) => {
  return (
    <div className="bg-blue-600 p-4 rounded-lg shadow-2xl">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center">
          {row.map((col, colIdx) => (
            <Cell
              key={`${rowIdx} - ${colIdx}`}
              value={col}
              onClick={() => onDrop(colIdx)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
