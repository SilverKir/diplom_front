import { GetDataFromAPI } from "..";
import { IRequestData } from "../../interfaces";

export const GetData = async (fetchParam: IRequestData) => {
  return (await GetDataFromAPI(fetchParam))
    .json()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
