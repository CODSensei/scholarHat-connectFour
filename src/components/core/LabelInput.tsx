import React from "react";

interface LabelInputProps {
  divCSS?: string;
  labelCSS?: string;
  label: string;
  playerName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputCSS?: string;
  placeholder: string;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  playerName,
  onChange,
  placeholder,
  divCSS,
  labelCSS,
  inputCSS,
}) => {
  return (
    <div className={`mb-4 ${divCSS}`}>
      <label className={`block text-gray-700 font-semibold mb-2 ${labelCSS}`}>
        {label}
      </label>
      <input
        type="text"
        value={playerName}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputCSS}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LabelInput;
