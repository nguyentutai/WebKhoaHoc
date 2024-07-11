import Category from "../controllers/category.js";
import { Router } from "express";
const categoryRouter = Router();

const categoryController = new Category();
// Lấy dữ liệu từ MongoDB
categoryRouter.get("/category", categoryController.getCategory);
// Lấy dữ liệu theo id
categoryRouter.get("/category/:id", categoryController.getCategoryId);
// Thêm dữ liệu vào MongoDB
categoryRouter.post("/category", categoryController.postCategory);
// Cập nhật dữ liệu course vào MongoDB
categoryRouter.put("/category/:id", categoryController.updateCategory);
// Xóa cứng course trong MongoDB
categoryRouter.delete("/category/:id", categoryController.removeCategoryById);
// Xóa mềm course trong MongoDB
categoryRouter.put("/category/:id", categoryController.softRemoveCategoryById);

export default categoryRouter;
