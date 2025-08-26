import { IRequestData } from "../../interfaces";

interface CreateHotel {
  title: string;
  description?: string;
}

export const CreateHotel = (req: CreateHotel): IRequestData => {
  return {
    url: "/admin/hotels",
    method: "POST",
    arg: req,
  };
};
