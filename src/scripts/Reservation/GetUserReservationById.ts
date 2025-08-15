import { IRequestData } from "../../interfaces";

export const GetUserReservationById = (id: string): IRequestData => {
  return {
    url: `/manager/reservations/${id}`,
    method: "GET",
  };
};
