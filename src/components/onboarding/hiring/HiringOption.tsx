"use client";

interface HiringOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const HiringOption = ({
  label,
  selected,
  onClick,
}: HiringOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-lg border text-xs font-medium transition-all",
        selected
          ? "border-gray-950 bg-gray-950 text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900",
      ].join(" ")}
    >
      {label}
    </button>
  );
};

export default HiringOption;