import categorySchema from "../model/categorySchema.js";
import courseSchema from "../model/courseSchema.js";

class Category {
  // Lấy dữ liệu từ MongoDB
  async getCategory(req, res) {
    try {
      // Thực hiện kết nỗi sang conlection courses
      const data = await categorySchema.find({}).populate("coursesId");
      if (data && data.length > 0) {
        return res.status(200).json({
          message: "Get Category Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log("getCategory False" + error);
    }
  }
  // Lấy dữ liệu theo id
  async getCategoryId(req, res) {
    try {
      const data = await categorySchema
        .findById(req.params.id)
        .populate("coursesId");
      if (data) {
        res.status(200).json({
          status: true,
          message: "GetCategoryId Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log("GetCategoryId False" + error);
    }
  }

  // Thêm dữ liệu vào MongoDB
  async postCategory(req, res) {
    try {
      const data = await categorySchema.create(req.body);
      res.status(201).json({
        status: true,
        message: "Add Category Successfully",
        data: data,
      });
    } catch (error) {
      console.log("Add Category False" + error);
    }
  }

  // Cập nhật dữ liệu Category vào MongoDB
  async updateCategory(req, res) {
    try {
      const dataPro = await categorySchema.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        {
          new: true,
        }
      );
      if (dataPro) {
        res.send({
          status: true,
          message: "Update Category Successfully",
          dataPro,
        });
      } else {
        res.send({ status: false, message: "Update Category False" });
      }
    } catch (error) {
      console.log("Update Category False" + error);
    }
  }

  // Xóa cứng Category trong MongoDB
  async removeCategoryById(req, res) {
    if (req.params.id === "668e8193748c8b65fecacfe2") {
      return res.status(400).json({
        message: "Không thể xoá danh mục mặc định",
      });
    }

    // Cập nhật lại sản phẩm trong danh mục bị xóa về danh mục mặc định
    // B1: Lấy ra tất cả sản phẩm trong danh mục bị xóa
    const categorysToUpdate = await courseSchema.find({
      category: req.params.id,
    });
    // B2: Thực hiện cập nhật lại sản phẩm đó về danh mục mặc định
    await Promise.all(
      categorysToUpdate.map(async (product) => {
        product.categoryId = "668e8193748c8b65fecacfe2";
        await product.save();
      })
    );

    const data = await categorySchema.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).json({
        message: "Delete Category Successfully!",
        data: data,
      });
    }
    return res.status(400).json({ message: "Xóa danh mục thất bại" });
  }

  // Xóa mềm Category trong MongoDB
  async softRemoveCategoryById(req, res) {
    try {
      const dataPro = await categorySchema.findByIdAndUpdate(
        `${req.params.id}`,
        {
          status: true,
          hide: true,
        },
        {
          new: true,
        }
      );
      if (dataPro) {
        res.send({
          status: true,
          message: "Soft Remove Category Successfully",
        });
      }
    } catch (error) {
      console.log("softRemoveCourseById Category False");
    }
  }
}

export default Category;
