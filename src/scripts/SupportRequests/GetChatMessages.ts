import { IRequestData } from "../../interfaces";

export const GetChatMessages = (id: string): IRequestData => {
  return {
    url: `/common/support-requests/${id}/messages`,
    method: "GET",
  };
};
