export const GetFileNameFromLink = (link: string): string => {
  const separator = "/";
  const parts = link.split(separator);
  return parts[parts.length - 1];
};
