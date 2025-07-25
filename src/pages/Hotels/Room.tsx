import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const Room = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.apiAction);

  return (
    <>
      <h3>Hotel {id}</h3>
    </>
  );
};
