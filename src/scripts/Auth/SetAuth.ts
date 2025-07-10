import { IRequestData } from "../../interfaces";

export interface authRequest {
  email: string;
  password: string;
}

export const SetAuth =  (req: authRequest): IRequestData => {
  return {
    url: "/auth/login",
    method: "POST",
    arg: req,
  };
};
