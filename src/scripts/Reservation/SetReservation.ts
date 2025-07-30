import { IRequestData } from "../../interfaces";

export interface reservationRequest {
  hotelRoom: string;
  startDate: string;
  endDate: string;
}

export const SetReservation = (req: reservationRequest): IRequestData => {
  return {
    url: "/client/reservations",
    method: "POST",
    arg: req,
  };
};
