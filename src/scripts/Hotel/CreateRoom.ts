import { IRequestData, IRoom } from "../../interfaces";

import { GetFileFromLink } from "../GetData";

export const CreateRoom = (reg: IRoom): IRequestData => {
  const data = new FormData();
  console.log(reg.images);

  data.append("hotelId", reg.hotelId);
  if (reg.description) data.append("description", reg.description);
  if (reg.isEnabled) data.append("isEnabled", "true");
  if (reg.images) {
    reg.images.map(async (image) => {
      data.append("images", await GetFileFromLink(image));
    });
  }

  return {
    url: `/admin/hotel-rooms`,
    method: "POST",
    arg: data,
  };
};
