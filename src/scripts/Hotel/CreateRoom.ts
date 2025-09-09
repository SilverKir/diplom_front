import { IRequestDataWithImages, IRoom } from "../../interfaces";

import { GetFileFromLink } from "../GetData";

export const CreateRoom = (reg: IRoom): IRequestDataWithImages => {
  const data = new FormData();

  data.append("hotelId", reg.hotelId);
  if (reg.description) data.append("description", reg.description);
  if (reg.isEnabled) data.append("isEnabled", "true");
  if (reg.images) {
    reg.images.map((image, index) => {
      const match = image.match(/^data:([^;]+);base64,/);
      let mimeType = "";
      if (match && match[1]) {
        mimeType = match[1];
      }

      let extension = "";
      if (mimeType.startsWith("image/")) {
        extension = mimeType.split("/")[1];
      }

      data.append(
        "images",
        GetFileFromLink(image, mimeType),
        `Фото ${index.toString()}.${extension}`
      );
    });
  }

  return {
    url: `/admin/hotel-rooms`,
    method: "POST",
    arg: data,
  };
};
