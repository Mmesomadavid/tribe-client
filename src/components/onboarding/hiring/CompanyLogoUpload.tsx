"use client";

import { Building2, Upload, X } from "lucide-react";

interface CompanyLogoUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const CompanyLogoUpload = ({
  value,
  onChange,
}: CompanyLogoUploadProps) => {
  const handleFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">

      <div className="relative">

        <div className="h-16 w-16 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
          {value ? (
            <img
              src={value}
              alt="Company logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2
              size={22}
              className="text-gray-300"
            />
          )}
        </div>

        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-full bg-gray-950 text-white flex items-center justify-center"
          >
            <X size={10} />
          </button>
        )}
      </div>

      <div>
        <label className="inline-flex items-center gap-2 cursor-pointer text-[11px] font-medium text-gray-900">
          <Upload size={13} />
          Upload company logo

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFile}
            className="hidden"
          />
        </label>

        <p className="text-[9px] text-gray-400 mt-1">
          PNG, JPG or WebP · Recommended 400×400
        </p>
      </div>

    </div>
  );
};

export default CompanyLogoUpload;