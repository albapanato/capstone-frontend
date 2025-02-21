export const formatDate = (date) => {
  if (!date) return "";
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(newDate);
};

export const formatTime = (time) => {
  if (!time) return "";
  const [hour, minutes] = time.split(":");
  return `${hour}:${minutes}`;
};
