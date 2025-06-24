export interface ILoginAction {
  id: number;
  name: string;
  link?: string;
  action?: () => void;
}
