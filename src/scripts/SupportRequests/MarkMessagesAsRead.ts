import { IRequestData } from "../../interfaces";

export const MarkMessagesAsRead = (
  chatId: string,
  createdBefore: string
): IRequestData => {
  return {
    url: `/common/support-requests/${chatId}/messages/read`,
    method: "POST",
    arg: { createdBefore: createdBefore },
  };
};
