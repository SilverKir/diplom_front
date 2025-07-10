import { IRequestData } from "../../interfaces";

export interface regRequest {
  email: string;
  password: string;
  name: string;
  contactPhone?: string;
}

export const SetRegister = (req: regRequest): IRequestData => {
  return {
    url: "/client/register",
    method: "POST",
    arg: req,
  };
};
