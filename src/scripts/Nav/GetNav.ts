import { ILoginAction } from "../../interfaces";
import { GetDataFromAPI } from "../index";

export const GetNav = async () => {
  const result = await GetDataFromAPI({
    url: "/nav",
    method: "GET",
  });

  return (await result.json()) as ILoginAction[];
};
