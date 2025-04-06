import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token || token === "undefined") {
      navigate("/signin");
    }
  }, [token, navigate]);

  if (!token || token === "undefined") return null;

  return children;
};

export default AuthWrapper;
