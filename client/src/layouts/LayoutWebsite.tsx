import Footer from "../pages/Website/FooterPage";
import AsidePage from "../pages/Website/AsidePage";
import { Outlet } from "react-router-dom";
import HeaderPage from "../pages/Website/HeaderPage";

export default function LayoutWebsite() {
  return (
    <>
      <HeaderPage />
      <div className="container container1">
        <AsidePage />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
