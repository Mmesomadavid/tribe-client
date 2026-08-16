"use client";

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Chip = ({ label, selected, onClick, disabled }: ChipProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed
      ${
        selected
          ? "bg-gray-950 border-gray-950 text-white"
          : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
      }`}
  >
    {label}
  </button>
);

export default Chip;