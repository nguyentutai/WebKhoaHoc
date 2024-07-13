import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
const PrivateRouterLogin = () => {
  const checkRole = JSON.parse(sessionStorage.getItem("user") as string);
  if (checkRole) {
    return <Navigate to={"/"} />;
  } else {
    toast.warning("You do not have login");
    return <Outlet />;
  }
};

export default PrivateRouterLogin;
