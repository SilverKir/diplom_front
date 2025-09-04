import {
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_4035,
  ERROR_4005,
  ERROR_4006,
} from "../../constants";

export const GetError = (err: string | number): string => {
  const error = Number(err);
  if (Number.isNaN(error)) {
    return err.toString();
  }
  switch (error) {
    case 400:
      return ERROR_400;
    case 401:
      return ERROR_401;
    case 403:
      return ERROR_403;
    case 404:
      return ERROR_404;
    case 4035:
      return ERROR_4035;
    case 4005:
      return ERROR_4005;
    case 4006:
      return ERROR_4006;

    default:
      return "Unknown error " + error;
  }
};
