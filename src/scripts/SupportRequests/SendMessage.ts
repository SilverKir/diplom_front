import { IRequestData } from "../../interfaces";

export const SendMessage = (chatId: string, text: string): IRequestData => {
  return {
    url: `/common/support-requests/${chatId}/messages`,
    method: "POST",
    arg: { text: text },
  };
};
