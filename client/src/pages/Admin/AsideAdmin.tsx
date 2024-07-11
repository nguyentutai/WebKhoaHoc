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
              <Link to={"/admin"}>
                <section>
                  <i className="fa-solid fa-chart-line"></i>
                  <p>Dashboards</p>
                </section>
              </Link>
            </li>
            <li>
              <Link to={"category"}>
                <section>
                  <i className="fa-solid fa-table-cells"></i>
                  <p>Categorys</p>
                </section>
              </Link>
            </li>
            <li>
              <Link to={"blog"}>
                <section>
                  <i className="fa-brands fa-discourse"></i>
                  <p>Blog</p>
                </section>
              </Link>
            </li>
            <li>
              <Link to={"course"}>
                <section>
                  <i className="fa-brands fa-blogger-b"></i>
                  <p>Cousres</p>
                </section>
              </Link>
            </li>
            <li>
              <Link to={""}>
                <section>
                  <i className="fa-solid fa-user"></i>
                  <p>User</p>
                </section>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
