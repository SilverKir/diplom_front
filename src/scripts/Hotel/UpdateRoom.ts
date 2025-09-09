import { IRequestDataWithImages, IRoom } from "../../interfaces";

import { GetFileFromLink, GetFileNameFromLink } from "../GetData";

export const UpdateRoom = (reg: IRoom): IRequestDataWithImages => {
  const data = new FormData();
  data.append("hotelId", reg.hotelId);
  if (reg.description) data.append("description", reg.description);
  if (reg.isEnabled) data.append("isEnabled", "true");
  if (reg.images) {
    reg.images.map((image, index) => {
      const match = image.match(/^data:([^;]+);base64,/);
      if (match) {
        let mimeType = "";
        if (match[1]) {
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
      } else {
        data.append("images", GetFileNameFromLink(image));
      }
    });
  }

  return {
    url: `/admin/hotel-rooms/${reg.id}`,
    method: "PUT",
    arg: data,
  };
};
