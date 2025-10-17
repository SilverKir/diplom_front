import { IGetSupportRequests, IRequestData } from "../../interfaces";

export const GetClientSupportRequests = (
  req: IGetSupportRequests
): IRequestData => {
  return {
    url: "/client/support-requests",
    method: "GET",
    query: {
      limit: req.limit,
      offset: req.offset,
      isActive: req.isActive,
    },
  };
};
