import { GetDataFromAPI } from "../index";

export const GetNav = async () => {
  return await GetDataFromAPI({
    url: "/nav",
    method: "GET",
  });
};
