import { IRequestDataWithImages } from "../../interfaces";

const URL = import.meta.env.VITE_APP_NAMES_URL;

export const SendFormDataToAPI = async (fetchParam: IRequestDataWithImages) => {
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
        Cookie: document.cookie,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: fetchParam.arg,
    }
  );

  if (!response.ok) {
    throw new Error(String(response.status));
  }
  return response;
};
