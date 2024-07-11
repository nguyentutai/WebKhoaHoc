import { Link } from "react-router-dom";
const AsidePage = () => {
    return (
        <section className="menu-left">
            <aside>
                <div className="home-page">
                    <Link className="add-blog" to={'/write-blog'}>
                        <i className="fa-solid fa-plus"></i>
                    </Link>
                    <Link className="link-home" to={`/`}>
                        <div className="logo-home">
                            <i className="fa-solid fa-house"></i>
                        </div>
                        <div className="title-home">
                            <p>Trang chủ</p>
                        </div>
                    </Link>
                    <Link className="link-route" to={`/router`}>
                        <div className="logo-route">
                            <i className="fa-solid fa-road"></i>
                        </div>
                        <div className="title-route">
                            <p>Lộ trình</p>
                        </div>
                    </Link>
                    <Link className="link-blog" to={`/blog`}>
                        <div className="logo-blog">
                            <i className="fa-brands fa-usps"></i>
                        </div>
                        <div className="title-blog">
                            <p>Bài viết</p>
                        </div>
                    </Link>
                </div>
            </aside>
        </section>
    )
}

export default AsidePage;