import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginProvider";
import { OrderContext } from "../../contexts/OrderProvider";

const HeaderPage = () => {
  const [login, setLogin] = useState(false);
  const [course, setCourse] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupRefCourse = useRef<HTMLDivElement>(null);
  const [listCourse, setListCourse] = useState([] as any[]);
  const { username, dispathLogin } = useContext(LoginContext);
  const { orders } = useContext(OrderContext);

  useEffect(() => {
    (async () => {
      const resuilt = await fetch(
        "http://localhost:3000/api/user/" +
          JSON.parse(sessionStorage.getItem("user") as string)?._id
      );
      const data = await resuilt.json();
      setCourse((prevLogin) => !prevLogin);
      setListCourse(data.data.orderId);
    })();
  }, [orders]);

  const toggleLogin = () => {
    setLogin((prevLogin) => !prevLogin);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCourse = () => {
    setCourse((prevLogin) => !prevLogin);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRefCourse.current &&
        !popupRefCourse.current.contains(event.target as Node)
      ) {
        setCourse(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    dispathLogin({
      type: "logout",
    });
  };
  return (
    <div className="header container">
      <div className="header-logo-title">
        <div className="header-logo">
          <img
            src="https://res.cloudinary.com/drz5kdrm5/image/upload/v1720687512/logo_igefux.png"
            alt="F8 học lập trình để đi làm"
          />
        </div>
        <div className="header-title">
          <h3>Học Lập Trình Để Đi Làm</h3>
        </div>
      </div>
      <div className="header-search">
        <form action="">
          <div className="search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type="search"
            placeholder="Tìm kiếm khóa học, bài viết, video, ... "
          />
        </form>
      </div>
      {username ? (
        <div className="header-account">
          <div className="course-myaccount" onClick={toggleCourse}>
            <h3>Khóa học của tôi</h3>
          </div>
          <div className="accout" onClick={toggleLogin}>
            <img src="../../public/image/account.jpg" alt="" />
          </div>
          {login && (
            <section className="popup-login active" ref={popupRef}>
              <div className="information">
                <div className="information-image">
                  <Link to={``}>
                    <img src="../../../public/image/account.jpg" alt="" />
                  </Link>
                </div>
                <div className="information-account">
                  <div className="information-acount-title">
                    <h4>{username.username}</h4>
                    <p>@nguyentai31</p>
                  </div>
                </div>
              </div>
              <div className="personal-page">
                <Link to={""}>Trang cá nhân</Link>
              </div>
              <div className="write-blogs">
                <Link to={""}>Viết blog</Link>
                <Link to={""}>Bài viết của tôi</Link>
              </div>
              <div className="write-save">
                <Link to={""}>Bài viết đã lưu</Link>
              </div>
              <div className="setting">
                <Link to={""}>Cài đặt</Link>
              </div>
              <div className="logout">
                <Link to={""} onClick={logout}>
                  Đăng xuất
                </Link>
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="header-login-logout">
          <div className="header-login">
            <Link to={"/login"}>Đăng nhập</Link>
          </div>
          <div className="header-logout">
            <Link to={"/register"}>Đăng kí</Link>
          </div>
        </div>
      )}
      {course && (
        <section ref={popupRefCourse} className="header-course-list">
          <div>
            {listCourse && listCourse.length > 0 ? (
              listCourse?.map((course) => (
                <div className="course-me" key={course._id}>
                  <div className="course-me-image">
                    <img
                      src={course.courseId[0]?.image}
                      alt={course.courseId[0]?.slug}
                    />
                  </div>
                  <div className="course-me-title">
                    <p>{course.courseId[0]?.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>Bạn không có khóa học nào</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HeaderPage;
