const URL = import.meta.env.VITE_APP_NAMES_URL;

export interface IRequestData {
  url: string;
  method: string;
  arg?: object;
}
const token = localStorage.getItem("token");

export const GetDataFromAPI = async (fetchParam: IRequestData) => {
  const response = await fetch(URL + fetchParam.url, {
    credentials: "include",
    method: fetchParam.method,
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fetchParam.arg),
  });
  if (!response.ok) {
    throw new Error(String(response.status));
  }
  return response;
};
