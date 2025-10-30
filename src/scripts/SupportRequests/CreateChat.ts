import { IRequestData } from "../../interfaces";

export const CreateChat = (text: string): IRequestData => {
  return {
    url: `/client/support-requests`,
    method: "POST",
    arg: { text: text },
  };
};
