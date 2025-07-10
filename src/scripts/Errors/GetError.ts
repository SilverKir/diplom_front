import { ERROR_400, ERROR_401, ERROR_403, ERROR_404 } from "../../constants";

export const GetError = (err: string | number): string => {
  const error = Number(err);
  switch (error) {
    case 400:
      return ERROR_400;
    case 401:
      return ERROR_401;
    case 403:
      return ERROR_403;
    case 404:
      return ERROR_404;

    default:
      return "Unknown error " + error;
  }
};
