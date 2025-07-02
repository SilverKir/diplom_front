import { ERROR_401, ERROR_403 } from "../../constants";

export const GetError = (err: string | number): string => {
  const error = Number(err);
  switch (error) {
    case 401:
      return ERROR_401;
    case 403:
      return ERROR_403;

    default:
      return "Unknown error " + error;
  }
};
