import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBlog } from "../../../interfaces/IBlog";
import instans from "../../../utils/Axios";

const BlogPage = () => {
  const [blog, setBlog] = useState<IBlog[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await instans.get("/blog");
      if (data) {
        setBlog(data.data);
      }
    })();
  }, []);
  return (
    <div className="container3 router-learn">
      <h3>Bài Viết Nổi Bật</h3>
      <p className="blog-title">
        Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và
        các kỹ thuật lập trình web.
      </p>
      <div className="blog-content">
        <div>
          {blog &&
            blog?.map((item, index) => (
              <div key={index}>
                <div className="doc-blog">
                  <div className="">
                    <Link to={item.slug}>{item.title}</Link>
                    <div className="blog-account">
                      <div className="blog-acount-like">
                        <i className="fa-solid fa-heart"></i>
                        <p>{item.like}</p>
                      </div>
                      <div className="blog-acount-write">
                        <h4>{item.authorId?.username}</h4>
                      </div>
                    </div>
                  </div>
                  <img className="blog-image" src={item.image_url} alt="" />
                </div>
              </div>
            ))}
        </div>
        <div className="blog-topic">
          <h3>XEM CÁC BÀI VIẾT THEO CHỦ ĐỀ</h3>
          <ul>
            <li>
              <a href="">Front-end / Mobile-apps</a>
            </li>
            <li>
              <a href="">Back-end / Devops</a>
            </li>
            <li>
              <a href="">UI / UX / Design</a>
            </li>
            <li>
              <a href="">Other</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
