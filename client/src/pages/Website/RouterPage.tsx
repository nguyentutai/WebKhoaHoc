import { Link } from "react-router-dom";
const RouterPage = () => {
    return (
        <div className="container3 router-learn">
            <h3>Lộ trình học</h3>
            <div className="learn-content">
                <p>Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí
                    "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".</p>
            </div>
            <div className="router-chidren">
                <div className="router-font">
                    <div className="router-font-par">
                        <div className="route-font-chid">
                            <div className="router-font-title">
                                <h4>Lộ trình học Front-end</h4>
                            </div>
                            <div className="router-font-content">
                                <p>Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.</p>
                            </div>
                        </div>
                        <div className="router-font-image">
                            <Link to={''}>
                                <img src="../../public/image/font-end.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className="router-font-language">
                        <div className="introduction">
                            <Link to={''}>
                                <img src="../../public/image/nhap-mon.png" alt="" />
                            </Link>
                        </div>
                        <div className="language-html">
                            <Link to={''}>
                                <img src="../../public/image/htmlpro.png" alt="" />
                            </Link>
                        </div>
                        <div className="languge-repon">
                            <Link to={''}>
                                <img src="../../public/image/reponsive.png" alt="" />
                            </Link>
                        </div>
                        <div className="languag-javascript">
                            <Link to={''}>
                                <img src="../../public/image/javascript.png" alt="" />
                            </Link>
                        </div>
                        <div className="languge-react">
                            <Link to={''}>
                                <img src="../../public/image/react.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className="watch-detail">
                        <p>Xem chi tiết</p>
                    </div>
                </div>
                <div className="router-back">
                    <div className="router-back-par">
                        <div className="route-back-chid">
                            <div className="router-back-title">
                                <h4>Lộ trình học Back-end</h4>
                            </div>
                            <div className="router-back-content">
                                <p>Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.</p>
                            </div>
                        </div>
                        <div className="router-back-image">
                            <Link to={''}>
                                <img src="../../public/image/back-end.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className="router-back-language">
                        <div className="introduction">
                            <Link to={''}>
                                <img src="../../public/image/nhap-mon.png" alt="" />
                            </Link>
                        </div>
                        <div className="language-html">
                            <Link to={''}>
                                <img src="../../public/image/htmlpro.png" alt="" />
                            </Link>
                        </div>
                        <div className="languge-repon">
                            <Link to={''}>
                                <img src="../../public/image/reponsive.png" alt="" />
                            </Link>
                        </div>
                        <div className="languag-javascript">
                            <Link to={''}>
                                <img src="../../public/image/javascript.png" alt="" />
                            </Link>
                        </div>
                        <div className="languge-react">
                            <Link to={''}>
                                <img src="../../public/image/react.png" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className="watch-detail">
                        <p>Xem chi tiết</p>
                    </div>
                </div>
            </div>
            <div className="router-lenarn-face">
                <div className="router-learn-face-content">
                    <div className="add-face">
                        <h4>Tham gia cộng đồng học viên F8 trên Facebook</h4>
                    </div>
                    <div className="add-face-content">
                        <p>Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé.</p>
                    </div>
                    <div className="add-face-button">
                        <p>Tham gia nhóm</p>
                    </div>
                </div>
                <div className="add-router-image">
                    <Link to={''}> 
                        <img src="../../public/image/add-face.png" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RouterPage;