import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IBlog } from "../../../interfaces/IBlog";
import instans from "../../../utils/Axios";
import { toast } from "react-toastify";

export default function DetailBlog() {
  const { slug } = useParams();
  const [contentBlog, setContentBlog] = useState({} as IBlog);
  const [checklike, setCheckLike] = useState(false);
  const [like, setLike] = useState(0);

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const { data } = await instans.get(`/blogslug/${slug}`);
          // const response = await fetch(
          //   `http://localhost:3000/api/blogslug/${slug}`
          // );
          // const data = await response.json();
          setContentBlog(data.data);
          setLike(data?.data.like);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [slug]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instans.put(`/blogLike/${contentBlog._id}`, {
          like: like,
        });

        // const response = await fetch(
        //   `http://localhost:3000/api/blogLike/${contentBlog._id}`,
        //   {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ like }),
        //   }
        // );
        // const data = await response.json();
        if (data) {
          setLike(data.data.like);
          toast.success("Like successfully");
        }
      } catch (error) {
        console.error("Error updating like:", error);
      }
    })();
  }, [like, checklike]);

  const toggleLike = () => {
    setCheckLike(!checklike);
    setLike((prevLike) => prevLike + (checklike ? -1 : 1));
  };

  return (
    <div className="container container3">
      <div className="detail-blog">
        <div className="acount-detail-blog">
          <div className="name-acount-detail-blog">
            <h2>Nguyễn Tú Tài</h2>
            <p>Lập trình là đam mê</p>
          </div>
          <div className="blog-childen">
            <div className="blog-chidren-like">
              <span>{like}</span>
            </div>
            <div className="blog-like" onClick={toggleLike}>
              {!checklike ? (
                <i className="fa-regular fa-heart"></i>
              ) : (
                <i
                  className="fa-solid fa-heart"
                  style={{ color: "#ff0000" }}
                ></i>
              )}
            </div>
          </div>
        </div>
        <div className="content-detail-blog">
          <h3>Bài viết</h3>
          <h3>{contentBlog.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: contentBlog.content }} />
        </div>
      </div>
      <style>{`
            img {
              max-width: 100%;
              height: auto;
              border: 2px solid #ccc;
              border-radius: 10px;
            }
            .ql-align-center {
              text-align: center;
            }
          `}</style>
    </div>
  );
}
