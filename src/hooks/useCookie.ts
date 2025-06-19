import { useState, useEffect } from "react";

export const useCookie=(name: string, initialValue: string) =>{
  const [cookie, setCookie] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
    return cookieValue ? cookieValue : initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.cookie = `${name}=${cookie}; path=/`;
    }
  }, [cookie, name]);

  return [cookie, setCookie];
}


