import { IRequestData } from "../interfaces";

const URL = import.meta.env.VITE_APP_NAMES_URL;

export const GetDataFromAPI = async (fetchParam: IRequestData) => {
  const response = await fetch(
    URL +
      fetchParam.url +
      "?" +
      new URLSearchParams(
        fetchParam.query as Record<string, string>
      ).toString(),
    {
      credentials: "include",
      method: fetchParam.method,
      headers: {
        "Content-Type": "application/json",
        Cookie: document.cookie,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(fetchParam.arg),
    }
  );
  if (!response.ok) {
    throw new Error(String(response.status));
  }
  return response;
};
