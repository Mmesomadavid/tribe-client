"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

const TagInput = ({ values, onChange, placeholder, suggestions = [] }: TagInputProps) => {
  const [input, setInput] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag || values.some((v) => v.toLowerCase() === tag.toLowerCase())) {
      setInput("");
      return;
    }
    onChange([...values, tag]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && !input && values.length) {
      onChange(values.slice(0, -1));
    }
  };

  const filteredSuggestions = suggestions
    .filter(
      (s) => s.toLowerCase().includes(input.toLowerCase()) && !values.some((v) => v.toLowerCase() === s.toLowerCase())
    )
    .slice(0, 6);

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2.5 rounded-xl border border-gray-200 bg-gray-50/60 focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900 transition-all min-h-[46px]">
        {values.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 bg-gray-950 text-white text-xs font-medium px-3 py-1.5 rounded-full"
          >
            {tag}
            <button type="button" onClick={() => onChange(values.filter((v) => v !== tag))} aria-label={`Remove ${tag}`}>
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addTag(input)}
          placeholder={values.length ? "" : placeholder}
          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-gray-300 py-1.5"
        />
      </div>

      {input && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
          {filteredSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className="w-full text-left px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;