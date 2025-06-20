import { useState, useEffect } from "react";
import { useAppSelector } from "./index";

type GetDataResult<T> = {
  data: T;
  hasError: Error | null;
};

export const useGetData = <T>(
  url: string,
  method: string,
  arg: object,
  initialData: T
): GetDataResult<T> => {
  const [data, setData] = useState(initialData);
  const [hasError, setError] = useState<Error | null>(null);
  const { authToken } = useAppSelector((state) => state.authToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          credentials: "include",
          method: method,
          headers: {
            "Content-Type": "application/json",
            Cookie: document.cookie,
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(arg),
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const getData = await res.json();
        setData(getData);
        setError(null);
      } catch (e) {
        setError(e as Error);
      }
    };

    fetchData();
  }, []);

  return { data, hasError };
};
