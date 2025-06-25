import { ERROR_401 } from "../../constants";

export const GetError = (err: string|number): string => {
      const error = Number(err);
  switch (error) {
    case 401:
      return ERROR_401;
    default:
      return "Unknown error " + error;
  }
};
