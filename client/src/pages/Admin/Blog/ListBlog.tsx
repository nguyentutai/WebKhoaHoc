import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../../contexts/BlogProvider";
import { toast } from "react-toastify";
import { IBlog } from "../../../interfaces/IBlog";

export default function ListBlog() {
  const { blogs, dispatchBlog } = useContext(BlogContext);
  const [fillterBlog, setFilterBlog] = useState<IBlog[]>([]);
  const [value, setValue] = useState("");
  const [arrange, setArrange] = useState("");
  useEffect(() => {
    (async () => {
      const result = await fetch("http://localhost:3000/api/blog");
      const data = await result.json();
      console.log(data);
      dispatchBlog({
        type: "SET_BLOG",
        payload: data.data,
      });
    })();
  }, []);
  const onDelete = async (_id: string) => {
    try {
      const resuile = await fetch("http://localhost:3000/api/blog/" + _id, {
        method: "DELETE",
      });
      const data = await resuile.json();
      toast.success("Blog deleted successfully");
      dispatchBlog({
        type: "DELETE_BLOG",
        payload: data.data,
      });
      setFilterBlog(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let fillterBlog = [...blogs];
    if (value) {
      fillterBlog = fillterBlog.filter((pro: IBlog) =>
        pro.title.toLowerCase().includes(value.toLowerCase())
      );
    }

    if (arrange === "ascending") {
      fillterBlog.sort((a: IBlog, b: IBlog) => a.like - b.like);
    }
    if (arrange === "descending") {
      fillterBlog.sort((a: IBlog, b: IBlog) => b.like - a.like);
    }

    setFilterBlog(fillterBlog);
  }, [value, arrange, blogs]);
  return (
    <>
      <div className="list-blog">
        <div className="list-cate-title">
          <h2>List Blogs</h2>
          <div>
            <select
              name=""
              className="arrange"
              value={arrange}
              onChange={(e) => setArrange(e.target.value)}
              id=""
            >
              <option value="">Sắp xếp</option>
              <option value="ascending">Lượt thích tăng dần</option>
              <option value="descending">Lượt thích giảm dần</option>
            </select>
          </div>
          <div>
            <input
              type="search"
              className="search"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tìm kiếm sản phẩm ..."
            />
          </div>
          {/* <Link to={"form-blog"}>Add Category</Link> */}
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title Blog</th>
              <th>Acount Write</th>
              <th>Status Blog</th>
              <th>Like Blog</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {fillterBlog.length > 0 ? (
              fillterBlog?.map((blog, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{blog.title}</td>
                  <td>{blog.authorId?.username}</td>
                  <td>
                    <p className={blog.status ? "a" : "h"}>
                      {blog.status ? "Đã hiện" : "Đã Ẩn"}
                    </p>
                  </td>
                  <td>{blog.like}</td>
                  <td>
                    {/* <Link to={`${blog._id}/form-blog`}>Update</Link> |{" "} */}
                    <button onClick={() => onDelete(blog._id!)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Không có bài viết bạn cần tìm</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
