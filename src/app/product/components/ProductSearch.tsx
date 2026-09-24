"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface ProductSearchProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export default function ProductSearch({
  value,
  onChange,
  placeholder = "Search products by name...",
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState(value);

  // Sync internal state if external value changes (e.g. cleared via category select or URL change)
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Debounce: Wait until user stops typing (400ms) before triggering onChange
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== value) {
        onChange(searchTerm);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, onChange, value]);

  const handleClear = () => {
    setSearchTerm("");
    onChange("");
  };

  return (
    <div className="w-full">
      <label
        htmlFor="product-search"
        className="mb-2 block text-xs font-medium text-zinc-600"
      >
        Search
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
          <Search className="h-4 w-4" aria-hidden="true" />
        </div>

        <input
          id="product-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-10 w-full rounded-lg border border-zinc-300 bg-white pl-9 pr-9 text-sm text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 transition hover:text-zinc-600 focus:outline-hidden"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
