import React, { useEffect } from "react";

const Notification = ({ message, duration = 3, type = "info", onClose }) => {
  useEffect(() => {
    // Iniciar el temporizador para ocultar la notificación después de `duration` segundos
    const timer = setTimeout(() => {
      onClose(); // Llamar a la función para cerrar la notificación
    }, duration * 1000);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [duration, onClose]);

  // Definir los colores en función del tipo de notificación
  const notificationStyles = {
    info: "bg-indigo-500 text-white",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${notificationStyles[type]} transition-opacity`}
    >
      {message}
    </div>
  );
};

export default Notification;
