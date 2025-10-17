import { IGetSupportRequests, IRequestData } from "../../interfaces";

export const GetManagerSupportRequests = (
  req: IGetSupportRequests
): IRequestData => {
  return {
    url: "/manager/support-requests",
    method: "GET",
    query: {
      limit: req.limit,
      offset: req.offset,
      isActive: req.isActive,
    },
  };
};
