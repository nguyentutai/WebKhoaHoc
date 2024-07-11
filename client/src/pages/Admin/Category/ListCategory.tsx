import { useContext, useEffect } from "react";
import { CategoryContext } from "../../../contexts/CategoryProvider";
import { Link } from "react-router-dom";

export default function ListCategory() {
  const { categorys, dispatchCategoty } = useContext(CategoryContext);
  useEffect(() => {
    (async () => {
      const result = await fetch("http://localhost:3000/api/category");
      const data = await result.json();
      dispatchCategoty({
        type: "SET_CATEGORY",
        payload: data.data,
      });
    })();
  });
  return (
    <>
      <div className="list-category">
        <div className="list-cate-title">
          <h2>List Categorys</h2>
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
            {categorys?.map((category, index) => (
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
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
