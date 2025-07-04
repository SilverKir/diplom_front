import { ILoginAction } from "../../interfaces";
import { GetDataFromAPI } from "../index";

export interface IAuthNav {
  isAuth:boolean;
  nav: ILoginAction[];
}

export const GetNav = async () => {
  const result = await GetDataFromAPI({
    url: "/nav",
    method: "GET",
  });

  return (await result.json()) as IAuthNav;
};
