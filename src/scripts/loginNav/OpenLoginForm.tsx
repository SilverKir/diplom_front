import { useLocation, useNavigate } from "react-router-dom";

export const OpenLoginForm = (param: number) => {
  //   const location = useLocation();
  const navigate = useNavigate();
  //   const fromPage = location.state?.from;
  console.log(param);
  navigate(`${"/login"}`);
};
