import { Navigate, Outlet } from "react-router-dom";

const MiddlewareLoggedIn = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default MiddlewareLoggedIn;
