"use client";
import React, { useEffect, useState } from "react";

interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number; // Optional: debounce delay in ms
}

export default function TableSearch({
  value,
  onChange,
  placeholder,
  delay = 400,
}: TableSearchProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    // debounce
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay, onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder ?? "Search..."}
      className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
