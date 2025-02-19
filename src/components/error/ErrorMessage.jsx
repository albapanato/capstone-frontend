"use client";

import { Button } from "@/components/form-components/Button";
import { cn } from "@/utils/classes";
import { useRouter } from "next/navigation";

export const ErrorMessage = ({ message = "", className }) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 bg-black-100 border border-black-300 rounded-lg",
        className
      )}
    >
      <h2 className="text-lg font-semibold text-black-600">
        ¡Ups! No se encontró información
      </h2>
      <p className="text-sm text-gray-700 mt-2">{message}</p>
      <Button
        className="mt-4"
        onClick={() => router.refresh()} // 🔄 Recarga la página
      >
        Reintentar
      </Button>
    </div>
  );
};
