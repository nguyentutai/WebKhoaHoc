import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginProvider";

const HeaderPage = () => {
  const [login, setLogin] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { username, dispathLogin } = useContext(LoginContext);

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
            src="../../public/image/logo.png"
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
          <div className="course-myaccount">
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
                    <h4>{username}</h4>
                    <p>@nguyentai31</p>
                  </div>
                </div>
              </div>
              <div className="personal-page">
                <Link to={""}>Trang cá nhân</Link>
              </div>
              <div className="write-blog">
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
    </div>
  );
};

export default HeaderPage;
