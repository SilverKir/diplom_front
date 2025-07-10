import { IRequestData } from "../../interfaces";

export const SetLogout = (): IRequestData => {
  return {
    url: "/auth/logout",
    method: "POST",
  };
};
