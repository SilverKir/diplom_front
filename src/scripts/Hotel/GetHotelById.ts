import { IRequestData } from "../../interfaces";

export const GetHotelById = (id: string): IRequestData => {
  return {
    url: `/common/hotel-rooms/${id}`,
    method: "GET",
  };
};
