import { IRequestData } from "../../interfaces";

export const GetReservation = (): IRequestData => {
  return {
    url: "/client/reservations",
    method: "GET",
  };
};
