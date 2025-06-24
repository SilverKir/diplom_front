const URL = import.meta.env.VITE_APP_NAMES_URL;

export interface IRequestData {
  url: string;
  method: string;
  arg?: object;
  token: string;
}

export const GetDataFromAPI = async (fetchParam: IRequestData) => {
  return await fetch(URL + fetchParam.url, {
    credentials: "include",
    method: fetchParam.method,
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
      Authorization: `Bearer ${fetchParam.token}`,
    },
    body: JSON.stringify(fetchParam.arg),
  });
};
