import { IRequestData } from "../../interfaces";

export const GetNav = (): IRequestData => {
  return {
    url: "/nav",
    method: "GET",
  };
};
