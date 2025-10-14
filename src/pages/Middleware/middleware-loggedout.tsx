import { Navigate, Outlet } from "react-router-dom";

const MiddlewareLoggedOut = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};

export default MiddlewareLoggedOut;
