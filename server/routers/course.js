import Course from "../controllers/course.js";
import { Router } from "express";
import ValidateCourse from "../middleware/validateCourse.js";
const courseRouter = Router();

const courseController = new Course();
// Lấy dữ liệu từ MongoDB
courseRouter.get("/courses", courseController.getCourse);
// Lấy dữ liệu theo id
courseRouter.get("/courses/:id", courseController.getCourseId);
// Thêm dữ liệu vào MongoDB
courseRouter.post("/courses", ValidateCourse, courseController.postCourse);
// Cập nhật dữ liệu course vào MongoDB
courseRouter.put("/courses/:id", ValidateCourse, courseController.updateCourse);
// Xóa cứng course trong MongoDB
courseRouter.delete("/courses/:id", courseController.removeCourseById);
// Xóa mềm course trong MongoDB
courseRouter.put("/courses/:id", courseController.softRemoveCourseById);
// Tìm kiếm khóa học theo title
courseRouter.get("/search", courseController.searchCourse);

export default courseRouter;
