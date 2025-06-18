import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);

  const fromPage = location.state?.from;

  const handleLogin = () => {
    handleAuth();
    navigate(`${fromPage ? fromPage : "/"}`);
  };

  return (
    <>
      <h1>Login page</h1>
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </>
  );
};
