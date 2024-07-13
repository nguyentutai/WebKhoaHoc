import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const PrivateRouterUser = () => {
  const nav = useNavigate();
  const checkRole = JSON.parse(sessionStorage.getItem("user") as string);
  if (checkRole) {
    return <Outlet />;
  } else {
    toast.warning("You do not have access");
    nav("/login");
    return <Navigate to="/login" />;
  }
};

export default PrivateRouterUser;
