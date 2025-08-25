import { IRegisterData, IRequestData } from "../../interfaces";

export const AddUser = (data:IRegisterData): IRequestData => {
  return {
    url: '/admin/users',
    method: "POST",
    arg: data,
  };
};
