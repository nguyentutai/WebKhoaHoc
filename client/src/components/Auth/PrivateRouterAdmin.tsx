import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
const PrivateRouterAdmin = () => {
  const checkRole = JSON.parse(sessionStorage.getItem("user") as string)?.role;
  if (checkRole == 1) {
    return <Outlet />;
  } else {
    toast.warning("You do not have access");
    return <Navigate to="/login" />;
  }
};

export default PrivateRouterAdmin;
