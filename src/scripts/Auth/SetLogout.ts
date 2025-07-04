import { GetDataFromAPI } from "../index";

export const SetLogout = async () => {
  return await GetDataFromAPI({
    url: "/auth/logout",
    method: "POST",
  });
};
