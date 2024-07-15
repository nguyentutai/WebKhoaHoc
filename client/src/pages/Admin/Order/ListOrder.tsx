import { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { IBlog } from "../../../interfaces/IBlog";
import { OrderContext } from "../../../contexts/OrderProvider";
import instans from "../../../utils/Axios";

export default function ListOrder() {
  const { orders, dispatchOrder } = useContext(OrderContext);
  //   const [orders, setFilterOrder] = useState<IBlog[]>([]);
  //   const [value, setValue] = useState("");
  //   const [arrange, setArrange] = useState("");
  useEffect(() => {
    (async () => {
      // const result = await fetch("http://localhost:3000/api/order");
      const { data } = await instans.get(`/order`);

      // const data = await result.json();
      dispatchOrder({
        type: "SET_ORDER",
        payload: data.data,
      });
    })();
  }, []);
  //   const onDelete = async (_id: string) => {
  //     try {
  //       const resuile = await fetch("http://localhost:3000/api/blog/" + _id, {
  //         method: "DELETE",
  //       });
  //       const data = await resuile.json();
  //       toast.success("Blog deleted successfully");
  //       dispatchOrder({
  //         type: "DELETE_BLOG",
  //         payload: data.data,
  //       });
  //       setFilterOrder(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     let fillterOrder = [...orders];
  //     if (value) {
  //       fillterOrder = fillterOrder.filter((pro: IBlog) =>
  //         pro.title.toLowerCase().includes(value.toLowerCase())
  //       );
  //     }

  //     if (arrange === "ascending") {
  //       fillterOrder.sort((a: IBlog, b: IBlog) => a.like - b.like);
  //     }
  //     if (arrange === "descending") {
  //       fillterOrder.sort((a: IBlog, b: IBlog) => b.like - a.like);
  //     }

  //     setFilterOrder(fillterOrder);
  //   }, [value, arrange, orders]);
  return (
    <>
      <div className="list-order">
        <div className="list-cate-title">
          <h2>List Order</h2>
          {/* <div>
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
          </div> */}
          {/* <Link to={"form-blog"}>Add Category</Link> */}
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Acount Order Name</th>
              <th>Acount Order Email</th>
              <th>Status Order</th>
              <th>Course Order Title</th>
              <th>Course Order Image</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders?.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.userId.username}</td>
                  <td>{order.userId.email}</td>
                  <td>
                    <p className={order.status ? "a" : "h"}>
                      {order.status ? "Đã hiện" : "Đã Ẩn"}
                    </p>
                  </td>
                  <td>{order.courseId[0].title}</td>
                  <td>
                    <img
                      src={order.courseId[0].image}
                      alt={order.courseId[0].slug}
                    />
                  </td>
                  <td>
                    {/* <Link to={`${blog._id}/form-blog`}>Update</Link> |{" "} */}
                    {/* <button onClick={() => onDelete(blog._id!)}>Delete</button> */}
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
