import { IHotel, IRequestData } from "../../interfaces";


export const UpdateHotel = (req: IHotel): IRequestData => {
  return {
    url: `/admin/hotels/${req.id}`,
    method: "PUT",
    arg: {title: req.title,
          description:req.description,
    },
  };
};
