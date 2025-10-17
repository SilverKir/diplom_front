export const ConvertDate = (date: string): string => {
  const result = new Date(date);
  return result.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
