export interface IRequestData {
  url: string;
  method: string;
  arg?: object | FormData;
  query?: object;
}
