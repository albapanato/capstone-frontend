"use client";

import { useState, useEffect } from "react";
import { cn } from "../../utils/classes";

export const SearchSelect = ({
  name,
  className,
  wrapperClassName,
  label,
  error,
  options = [],
  value,
  onChange,
  disabled,
}) => {
  const [search, setSearch] = useState(value ?? "");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (selectedOption) => {
    setSearch(selectedOption.label);
    onChange(selectedOption.value); // React-hook-form actualizará el valor aquí
    setIsOpen(false);
  };

  useEffect(() => {
    if (!value) return;
    const selectedOption = options.find(
      (option) => option.value.toString() === value.toString()
    );
    if (selectedOption) {
      setSearch(selectedOption.label);
    }
  }, [options, value]);

  return (
    <div className={cn("relative space-y-2", wrapperClassName)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        <input
          autoComplete="off"
          disabled={disabled}
          type="text"
          name={name}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Para evitar que se cierre antes de seleccionar
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          placeholder="Buscar..."
        />

        {isOpen && (
          <ul className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md z-10">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  onMouseDown={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No hay resultados
              </li>
            )}
          </ul>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
