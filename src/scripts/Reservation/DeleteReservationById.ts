import { IRequestData } from "../../interfaces";

export const DeleteReservationById = (id: string): IRequestData => {
  return {
    url: `/client/reservations/${id}`,
    method: "DELETE",
  };
};
