"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { apiFetch, ApiError } from "../../../lib/api";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface AvatarUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

const AvatarUpload = ({ value, onChange }: AvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG, or WEBP images are allowed");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Image must be under 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    try {
      // NOTE: assumes apiFetch passes a FormData body through untouched
      // (no JSON.stringify, no forced Content-Type header). If it
      // always sets Content-Type: application/json, this needs a raw
      // fetch() call instead — see note at the end of my response.
      const data = await apiFetch<{ avatar: string }>("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });
      onChange(data.avatar);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setError(null);
    setIsUploading(true);
    try {
      await apiFetch("/api/profile/avatar", { method: "DELETE" });
      onChange(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not remove photo.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 shrink-0">
        <div className="h-20 w-20 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
          {value ? (
            <img src={value} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <Camera size={20} className="text-gray-300" />
          )}
        </div>
        {isUploading && (
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
            <Loader2 size={18} className="text-white animate-spin" />
          </div>
        )}
        {value && !isUploading && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-gray-950 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
            aria-label="Remove photo"
          >
            <X size={12} />
          </button>
        )}
      </div>

      <div>
        <button
          type="button"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
          className="text-sm font-medium text-gray-900 border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors disabled:opacity-40"
        >
          {value ? "Replace photo" : "Upload photo"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        {error && <p className="text-[11px] text-red-500 mt-1.5">{error}</p>}
        {!error && <p className="text-[11px] text-gray-400 mt-1.5">JPEG, PNG or WEBP. Max 5MB.</p>}
      </div>
    </div>
  );
};

export default AvatarUpload;