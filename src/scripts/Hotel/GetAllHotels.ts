import { IRequestData } from "../../interfaces";

export interface getAllHotels {
  limit?: number;
  offset?: number;
}

export const GetAllHotels = (req: getAllHotels): IRequestData => {
  return {
    url: "/admin/hotels",
    method: "GET",
    query: {
      limit: req.limit,
      offset: req.offset,
    },
  };
};
