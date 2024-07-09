import { useEffect, useState } from "react";
import { IBlog } from "../interfaces/IBlog";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [blog, setBlog] = useState<IBlog[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/blog")
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
      });
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
            blog.map((item, index) => (
              <div key={index}>
                <div className="doc-blog">
                  <div>
                    <Link to={""}>{item.title}</Link>
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
