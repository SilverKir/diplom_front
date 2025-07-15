import { IRequestData } from "../../interfaces";

export interface getHotel {
  hotelTitle?: string;
  limit?: number;
  offset?: number;
  dateStart?: Date;
  dateEnd?: Date;
}

export const GetHotels = (req: getHotel): IRequestData => {
  return {
    url: "/common/hotel-rooms",
    method: "GET",
    query: {
      dateStart: req.dateStart,
      dateEnd: req.dateEnd,
      limit: req.limit,
      offset: req.offset,
      hotel: req.hotelTitle ? req.hotelTitle : "",
    },
  };
};
