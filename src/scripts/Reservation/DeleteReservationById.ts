import { IRequestData } from "../../interfaces";

export const DeleteReservationById = (
  id: string,
  role: string
): IRequestData => {
  if (role === "manager")
    return {
      url: `/manager/reservations/${id}`,
      method: "DELETE",
    };
  return {
    url: `/client/reservations/${id}`,
    method: "DELETE",
  };
};
