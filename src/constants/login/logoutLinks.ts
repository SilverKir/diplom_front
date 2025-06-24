import { ILoginAction } from "../../interfaces";
import { Logout } from "../../scripts";

export const logoutLinks: ILoginAction[] = [
  { id: 1, name: "Выйти", action: Logout },
];
