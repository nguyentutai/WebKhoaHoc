import { Link } from "react-router-dom";
import ICousrse from "../../../interfaces/ICousrse";
interface getCourse {
  listCourse: ICousrse[];
}
const CourseProPage = (props: getCourse) => {
  return (
    <div className="course container4">
      <h2 className="cousre-pro">
        <span className="pro">Khóa học Pro</span>
        <span className="course-new">Mới</span>
      </h2>
      <div className="course-parent">
        {props.listCourse?.map((course) => {
          return (
            <div className="course-chid" key={course._id}>
              <div className="course-image">
                <img src={course.image} alt="" />
                <Link to={`${course.link}`} className="course-watch">
                  <p>Xem khóa học</p>
                </Link>
                <div className="course-p">
                  <i className="fa-solid fa-crown"></i>
                </div>
              </div>
              <div className="course-title">
                <Link to={""}>{course.title}</Link>
              </div>
              <div className="course-price">
                <div className="course-discount">
                  <p>{Number(course.discount).toLocaleString()}đ</p>
                </div>
                <div className="course-tree">
                  <p>{Number(course.cornerprice).toLocaleString()}đ</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseProPage;
