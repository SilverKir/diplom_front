import { IClientReservation } from "../../interfaces";

export const ClientReservationForm = (props: IClientReservation) => {
  const ConvertDate = (date: string): string => {
    const result = new Date(date);
    return result.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <>
      <td>{props.hotel.title}</td>
      <td> {ConvertDate(props.startDate)}</td>
      <td> {ConvertDate(props.endDate)}</td>
    </>
  );
};
