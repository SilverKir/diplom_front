import { IRequestData } from "../../interfaces";

interface GetRoomsById {
  id: string;
  limit?: number;
  offset?: number;
}

export const GetRoomsByHotelId = (req: GetRoomsById): IRequestData => {
  return {
    url: `/admin/hotel-rooms/${req.id}`,
    method: "GET",
    query: {
      limit: req.limit,
      offset: req.offset,
    },
  };
};
