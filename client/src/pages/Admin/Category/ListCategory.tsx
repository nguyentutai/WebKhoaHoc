import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../../contexts/CategoryProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ICategory } from "../../../interfaces/ICategory";
import instans from "../../../utils/Axios";

export default function ListCategory() {
  const { categorys, dispatchCategoty } = useContext(CategoryContext);
  const [fillterCate, setFilterCourse] = useState<ICategory[]>([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    (async () => {
      // const result = await fetch("http://localhost:3000/api/category");
      const { data } = await instans.get(`/category`);
      dispatchCategoty({
        type: "SET_CATEGORY",
        payload: data.data,
      });
      setFilterCourse(data.data);
    })();
  });
  useEffect(() => {
    let fillterCate = [...categorys];
    if (value) {
      fillterCate = fillterCate.filter((pro: ICategory) =>
        pro.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setFilterCourse(fillterCate);
  }, [value, categorys]);
  const onDelete = async (_id: string) => {
    try {
      const { data } = await instans.delete(`/category/${_id}`);
      // const resuile = await fetch("http://localhost:3000/api/category/" + _id, {
      //   method: "DELETE",
      // });
      // const data = await resuile.json();
      // console.log(data.data);
      if (data.data) {
        toast.success("Category deleted successfully");
        dispatchCategoty({
          type: "DELETE_CATEGORY",
          payload: data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="list-category">
        <div className="list-cate-title">
          <h2>List Categorys</h2>
          <div>
            <input
              type="search"
              className="search"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tìm kiếm sản phẩm ..."
            />
          </div>
          <Link to={"form-category"}>Add Category</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name Category</th>
              <th>Status Category</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {fillterCate.length > 0 ? (
              fillterCate?.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <p className={category.isHidden ? "a" : "h"}>
                      {category.isHidden ? "Đã hiện" : "Đã Ẩn"}
                    </p>
                  </td>
                  <td>
                    <Link to={`${category._id}/form-category`}>Update</Link> |{" "}
                    <button onClick={() => onDelete(category._id!)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Không có danh mục bạn cần tìm</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
