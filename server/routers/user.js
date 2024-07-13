import { Router } from "express";
import User from "../controllers/user.js";
const userRouter = Router();

const userController = new User();
// Lấy dữ liệu từ MongoDB
userRouter.get("/user", userController.getUser);
userRouter.get("/user/:id", userController.getUserId);
// Lấy dữ liệu theo id
// userRouter.get("/order/:id", userController.getOrderById);
// // Thêm dữ liệu vào MongoDB
// userRouter.post("/order", userController.postOrder);
// // Cập nhật dữ liệu course vào MongoDB
// userRouter.put("/order/:id", categoryController.updateOrder);
// // Lấy đơn hàng theo Id người dùng

// // Xóa cứng course trong MongoDB
// userRouter.delete("/order/:id", categoryController.removeOrderById);
// // Xóa mềm course trong MongoDB
// userRouter.put("/category/:id", categoryController.softRemoveCategoryById);

export default userRouter;
