import { Outlet } from "react-router-dom";
import AsideAdmin from "../pages/Admin/AsideAdmin";
import HeaderAdmin from "../pages/Admin/HeaderAdmin";

export default function LayoutAdmin() {
  return (
    <>
      <HeaderAdmin />
      <div className="container-admin">
        <AsideAdmin />
        <div className="actical-admin">
          <Outlet />
        </div>
      </div>
    </>
  );
}
