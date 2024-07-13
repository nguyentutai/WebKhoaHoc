import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CourseContext } from "../../../contexts/CourseProvider";
import ICousrse from "../../../interfaces/ICousrse";
import { toast } from "react-toastify";

export default function ListCourse() {
  const { courses, dispatchCourses } = useContext(CourseContext);
  const [fillterCourse, setFilterCourse] = useState<ICousrse[]>([]);
  const [value, setValue] = useState("");
  const [arrange, setArrange] = useState("");
  useEffect(() => {
    (async () => {
      const result = await fetch("http://localhost:3000/api/courses");
      const data = await result.json();
      dispatchCourses({
        type: "SET_COURSE",
        payload: data.data,
      });
      setFilterCourse(data.data);
    })();
  }, []);

  const onDelete = async (_id: string) => {
    try {
      const resuile = await fetch("http://localhost:3000/api/courses/" + _id, {
        method: "DELETE",
      });
      const data = await resuile.json();
      console.log(data.data);
      if (data.data) {
        toast.success("Courses deleted successfully");
        dispatchCourses({
          type: "DELETE_COURSE",
          payload: data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let fillterCourse = [...courses];
    if (value) {
      fillterCourse = fillterCourse.filter((pro: ICousrse) =>
        pro.title.toLowerCase().includes(value.toLowerCase())
      );
    }

    if (arrange === "ascending") {
      fillterCourse.sort(
        (a: ICousrse, b: ICousrse) => a.cornerprice - b.cornerprice
      );
    }
    if (arrange === "descending") {
      fillterCourse.sort(
        (a: ICousrse, b: ICousrse) => b.cornerprice - a.cornerprice
      );
    }

    setFilterCourse(fillterCourse);
  }, [value, arrange, courses]);
  return (
    <>
      <div className="list-course">
        <div className="list-cour-title">
          <h2>List Courses</h2>
          <div>
            <select
              name=""
              className="arrange"
              value={arrange}
              onChange={(e) => setArrange(e.target.value)}
              id=""
            >
              <option value="">Sắp xếp</option>
              <option value="ascending">Giá tăng dần</option>
              <option value="descending">Giá giảm dần</option>
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
          <Link to={"form-course"}>Add Course</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title Course</th>
              <th>Image Course</th>
              <th>Cornerprice Course</th>
              <th>Discount Course</th>
              <th>Description Course</th>
              <th>Status Course</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {fillterCourse.length > 0 ? (
              fillterCourse?.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{course.title}</td>
                  <td>
                    <img src={course.image} alt={course.slug} />
                  </td>
                  <td>{Number(course.cornerprice).toLocaleString()}đ</td>
                  <td>{Number(course.discount).toLocaleString()}đ</td>
                  <td>{course.description}</td>
                  <td>
                    <p className={course.status ? "a" : "h"}>
                      {course.status ? "Đã hiện" : "Đã Ẩn"}
                    </p>
                  </td>
                  <td>
                    <Link to={`${course._id}/form-course`}>Update</Link> |{" "}
                    <button onClick={() => onDelete(course._id!)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Không có khóa học bạn cần tìm</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
