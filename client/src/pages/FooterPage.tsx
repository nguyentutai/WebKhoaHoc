import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer>
            <section className="footer">
                <div className="contact">
                    <div className="contact-title">
                        <div className="contact-title-image">
                            <Link to={''}>
                                <img src="../../public/image/logo.png" alt="" />
                            </Link>
                        </div>
                        <div className="contact-title-cont">
                            <h3>Học Lập Trình Để Đi Làm</h3>
                        </div>
                    </div>
                    <div className="contact-content">
                        <p>Điện thoại: 0246.329.1102</p>
                        <p className="contact-email">Email: contact@fullstack.edu.vn</p>
                        <p>Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội</p>
                    </div>
                </div>
                <div className="about-us">
                    <h3>VỀ F8</h3>
                    <Link to={''}>
                        Giới thiệu
                    </Link>
                    <Link to={''}>
                        Liên hệ
                    </Link>
                    <Link to={''}>
                        Điều khoản
                    </Link>
                    <Link to={''}>
                        Bảo mật
                    </Link>
                    <Link to={''}>
                        Cơ hội việc làm
                    </Link>
                </div>
                <div className="our-product">
                    <h3>SẢN PHẨM</h3>
                    <Link to={''}>
                        Game Nester
                    </Link>
                    <Link to={''}>
                        Game CSS Diner
                    </Link>
                    <Link to={''}>
                        Game CSS Selectors
                    </Link>
                    <Link to={''}>
                        Game Froggy Pro
                    </Link>
                    <Link to={''}>
                        Game Scoops
                    </Link>
                </div>
                <div className="tools">
                    <h3>CÔNG CỤ</h3>
                    <Link to={''}>
                        Tạo CV xin việc
                    </Link>
                    <Link to={''}>
                        Rút gọn liên kết
                    </Link>
                    <Link to={''}>
                        Clip-path maker
                    </Link>
                    <Link to={''}>
                        Snippet generator
                    </Link>
                    <Link to={''}>
                        Cảnh báo sờ tay lên mặt
                    </Link>
                </div>
                <div className="company">
                    <h3>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8</h3>
                    <p>Mã số thuế: 0109922901</p>
                    <p className="date-tl">Ngày thành lập: 04/03/2022</p>
                    <p>Lĩnh vực: Công nghệ, giáo dục, lập trình. F8 xây dựng và phát triển những
                        sản phẩm mang lại giá trị cho cộng đồng.</p>
                </div>
            </section>
        </footer>
    )
}

export default Footer;