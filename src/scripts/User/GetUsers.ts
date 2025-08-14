import { IRequestData } from "../../interfaces";

export interface getUsers {
  email?: string;
  name?: string;
  contactPhone?: string;
  limit?: number;
  offset?: number;
  role: string;
}

export const GetUsers = (req: getUsers): IRequestData => {
  const usersUrl = req.role === "admin" ? "/admin/users" : "/manager/users";
  return {
    url: usersUrl,
    method: "GET",
    query: {
      offset: req.offset,
      limit: req.limit,
      email: req.email,
      name: req.name,
      contactPhone: req.contactPhone,
    },
  };
};
