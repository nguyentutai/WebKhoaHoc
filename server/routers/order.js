import { Router } from "express";
import Order from "../controllers/order.js";
const orderRouter = Router();

const categoryController = new Order();
// Lấy dữ liệu từ MongoDB
orderRouter.get("/order", categoryController.getOrder);
// Lấy dữ liệu theo id
orderRouter.get("/order/:id", categoryController.getOrderById);
// Thêm dữ liệu vào MongoDB
orderRouter.post("/order", categoryController.postOrder);
// Cập nhật dữ liệu course vào MongoDB
orderRouter.put("/order/:id", categoryController.updateOrder);
// Lấy đơn hàng theo Id người dùng

// Xóa cứng course trong MongoDB
orderRouter.delete("/order/:id", categoryController.removeOrderById);
// // Xóa mềm course trong MongoDB
// orderRouter.put("/category/:id", categoryController.softRemoveCategoryById);

export default orderRouter;
