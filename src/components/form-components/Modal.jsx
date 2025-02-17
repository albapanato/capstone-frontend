"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/classes";

export default function Modal({ isOpen, onClose, children, size = 700, title = "Modal" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div
        className={cn(
          "relative bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out",
          "w-full h-full md:h-auto sm:max-w-full sm:max-h-full md:max-w-[size] md:max-h-[90vh]", // 📌 Móvil ocupa todo, Escritorio es limitado
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        )}
        style={{ maxWidth: `${size}px` }} // 👈 Aplica tamaño en escritorio
      >
        {/* Encabezado con título y botón de cerrar */}
        <div className="flex justify-between items-center border-b p-4 bg-white rounded-t-lg">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Contenedor con Scroll */}
        <div className="p-6 overflow-y-auto h-full md:h-auto max-h-[calc(90vh-61px)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}