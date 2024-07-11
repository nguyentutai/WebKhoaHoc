import { Link } from "react-router-dom";

export default function AsideAdmin() {
  return (
    <>
      <div className="aside-admin">
        <div className="image-admin">
          <img src="" alt="" />
        </div>
        <nav>
          <ul>
            <li>
              <i className="fa-solid fa-chart-line"></i>
              <Link to={""}>Dashboards</Link>
            </li>
            <li>
              <i className="fa-solid fa-table-cells"></i>
              <Link to={""}>Categorys</Link>
            </li>
            <li>
              <i className="fa-brands fa-discourse"></i>
              <Link to={""}>Courses</Link>
            </li>
            <li>
              <i className="fa-brands fa-blogger-b"></i>
              <Link to={""}>Blogs</Link>
            </li>
            <li>
              <i className="fa-solid fa-user"></i>
              <Link to={""}>User</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
