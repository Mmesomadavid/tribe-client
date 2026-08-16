"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { X } from "lucide-react";

interface HiringTagInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  max?: number;
}

const HiringTagInput = ({
  values,
  onChange,
  placeholder = "Type and press Enter",
  suggestions = [],
  max,
}: HiringTagInputProps) => {
  const [input, setInput] = useState("");

  const addValue = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return;
    if (values.includes(trimmed)) return;
    if (max && values.length >= max) return;

    onChange([...values, trimmed]);
    setInput("");
  };

  const removeValue = (value: string) => {
    onChange(values.filter((item) => item !== value));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addValue(input);
    }

    if (event.key === "Backspace" && !input && values.length) {
      removeValue(values[values.length - 1]);
    }
  };

  const availableSuggestions = suggestions.filter(
    (suggestion) => !values.includes(suggestion)
  );

  return (
    <div className="space-y-3">
      <div className="min-h-11 w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3 py-2 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition-all">
        <div className="flex flex-wrap items-center gap-1.5">
          {values.map((value) => (
            <span
              key={value}
              className="inline-flex items-center gap-1 rounded-lg bg-white border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-800"
            >
              {value}

              <button
                type="button"
                onClick={() => removeValue(value)}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}

          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={values.length ? "" : placeholder}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-300 py-1"
          />
        </div>
      </div>

      {availableSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {availableSuggestions.slice(0, 8).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addValue(suggestion)}
              className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-[11px] text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-all"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HiringTagInput;