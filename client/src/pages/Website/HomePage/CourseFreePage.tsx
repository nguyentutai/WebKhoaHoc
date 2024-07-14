import { Link, useNavigate } from "react-router-dom";
import ICousrse from "../../../interfaces/ICousrse";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../../contexts/OrderProvider";

interface getCourse {
  listCourse: ICousrse[];
}

const CourseFreePage = (props: getCourse) => {
  const { orders, dispatchOrder } = useContext(OrderContext);
  const nav = useNavigate();
  useEffect(() => {
    try {
      (async () => {
        const result = await fetch("http://localhost:3000/api/order");
        const data = await result.json();
        if (data.data) {
          dispatchOrder({
            type: "SET_ORDER",
            payload: data.data,
          });
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const byeCorse = async (course: ICousrse) => {
    if (JSON.parse(sessionStorage.getItem("user") as string)) {
      try {
        const result = await fetch("http://localhost:3000/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: JSON.parse(sessionStorage.getItem("user") as string)._id,
            courseId: course._id,
            totalPrice: course.cornerprice,
          }),
        });
        const data = await result.json();
        dispatchOrder({
          type: "ADD_ORDER",
          payload: data.data,
        });
        if (data.data) {
          const updatedResult = await fetch("http://localhost:3000/api/order");
          const updatedData = await updatedResult.json();
          if (updatedData.data) {
            dispatchOrder({
              type: "SET_ORDER",
              payload: updatedData.data,
            });
            toast.success("Successfully registered for the course");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("You do not have access");
      nav("/login");
    }
  };

  return (
    <div className="course container4">
      <h2 className="cousre-pro">
        <span className="pro">Khóa học Free</span>
        <span className="course-new">Mới</span>
      </h2>
      <div className="course-parent">
        {props.listCourse?.map((course) => {
          const isPurchased = orders.some(
            (order: any) =>
              order.userId._id ===
                JSON.parse(sessionStorage.getItem("user") as string)?._id &&
              order.courseId.some((cour: ICousrse) => cour._id === course._id)
          );
          return (
            <div className="course-chid" key={course._id}>
              <div className="course-image">
                <img src={course.image} alt="" />
                <button
                  onClick={() => !isPurchased && byeCorse(course)}
                  // className="course-watch"
                  className={
                    isPurchased
                      ? "course-watch course-watch-buy"
                      : "course-watch"
                  }
                  disabled={isPurchased}
                >
                  <p>{isPurchased ? "Vào học" : "Đăng kí học"}</p>
                </button>
                <div className="course-p">
                  <i className="fa-solid fa-crown"></i>
                </div>
              </div>
              <div className="course-title">
                <Link to={""}>{course.title}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseFreePage;
