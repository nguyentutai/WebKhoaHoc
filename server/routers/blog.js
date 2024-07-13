import Blog from "../controllers/blog.js";
import { Router } from "express";
const blogRouter = Router();

const blogController = new Blog();
// Lấy dữ liệu từ MongoDB
blogRouter.get("/blog", blogController.getBlog);
// Lấy dữ liệu theo id
blogRouter.get("/blog/:id", blogController.getBlogId);
blogRouter.get("/blogslug/:slug", blogController.getBlogSlug);
// Thêm dữ liệu vào MongoDB
blogRouter.post("/blog", blogController.postBlog);
// Cập nhật dữ liệu blog vào MongoDB
blogRouter.put("/blog/:id", blogController.updateBlog);
blogRouter.put("/blogLike/:id", blogController.updateLikeBlog);
// Xóa cứng blog trong MongoDB
blogRouter.delete("/blog/:id", blogController.removeBlogById);
// Xóa mềm blog trong MongoDB
blogRouter.put("/blog/:id", blogController.softRemoveBlogById);

export default blogRouter;
