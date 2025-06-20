import { GetDataFromAPI } from "../index";

export interface authRequest {
  email: string;
  password: string;
}

export const SetAuth = async (req: authRequest, token: string) => {
  return await GetDataFromAPI({
    url: "/auth/login",
    method: "POST",
    arg: req,
    token: token,
  });
};
