import blogSchema from "../model/blogSchema.js";
import categorySchema from "../model/categorySchema.js";
import courseSchema from "../model/courseSchema.js";

class Course {
  // Lấy dữ liệu từ MongoDB
  async getCourse(req, res) {
    try {
      const data = await courseSchema.find({}).populate("categoryId");
      if (data && data.length > 0) {
        return res.status(200).json({
          message: "Get Course Successfully",
          data,
        });
      }
    } catch (error) {
      console.log("getCourse False" + error);
    }
  }
  // Lấy dữ liệu theo id
  async getCourseId(req, res) {
    try {
      const data = await courseSchema
        .findById(req.params.id)
        .populate("categoryId");
      if (data) {
        res.send({
          status: true,
          message: "getCourse Successfully",
          data,
        });
      }
    } catch (error) {
      console.log("getCourse False" + error);
    }
  }

  // Thêm dữ liệu vào MongoDB
  async postCourse(req, res) {
    try {
      const data = await courseSchema.create(req.body);
      const updateCategory = await categorySchema.findByIdAndUpdate(
        data.categoryId,
        {
          $push: { coursesId: data._id },
        },
        { new: true }
      );
      if (!data || !updateCategory) {
        return res.status(400).json({ message: "Add Course False" });
      }
      return res.status(200).json({
        status: true,
        message: "Add Course Successfully",
        data,
      });
    } catch (error) {
      console.log("postCourse False" + error);
    }
  }

  // Cập nhật dữ liệu Course vào MongoDB
  async updateCourse(req, res) {
    try {
      const data = await courseSchema.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        {
          new: true,
        }
      );
      const updateCategory = await categorySchema.findByIdAndUpdate(
        data.categoryId,
        {
          $push: { courses: data._id },
        },
        { new: true }
      );
      if (data && updateCategory) {
        res.send({
          status: true,
          message: "Update Course Successfully",
          data,
        });
      } else {
        res.send({ status: false, message: "Update Course False" });
      }
    } catch (error) {
      console.log("Update Course False" + error);
    }
  }

  // Xóa cứng Course trong MongoDB
  async removeCourseById(req, res) {
    try {
      // Tìm khóa học theo ID
      const data = await courseSchema.findByIdAndDelete(req.params.id);

      if (!data) {
        return res.status(404).send({
          status: false,
          message: "Course not found",
        });
      }

      const cate = await categorySchema.updateOne(
        { _id: data.categoryId },
        { $pull: { coursesId: data._id } },
        { new: true }
      );

      if (cate.nModified === 0) {
        return res.status(400).send({
          status: false,
          message: "Failed to update category",
        });
      }

      res.send({
        status: true,
        message: "Remove Course Successfully",
        data: data,
      });
    } catch (error) {
      console.log("deleteCourse False: " + error);
      res.status(500).send({
        status: false,
        message: "An error occurred while removing the course",
      });
    }
  }

  // Xóa mềm Course trong MongoDB
  async softRemoveCourseById(req, res) {
    try {
      const data = await courseSchema.findByIdAndUpdate(
        `${req.params.id}`,
        {
          status: true,
          hide: true,
        },
        {
          new: true,
        }
      );
      if (data) {
        res.send({ status: true, message: "Soft Remove Course Successfully" });
      }
    } catch (error) {
      console.log("softRemoveCourseById Course Successfully");
    }
  }
  async searchCourse(req, res) {
    try {
      const keyword = req.query.keyword || "";
      const data = await courseSchema.find({
        title: new RegExp(keyword, "i"),
      });
      const data1 = await blogSchema.find({
        title: new RegExp(keyword, "i"),
      });
      return res.status(200).json({
        message: "Search Course Successfully",
        data: {
          courses: data,
          blogs: data1,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "searchCourse and Blog False",
      });
    }
  }
}

export default Course;
