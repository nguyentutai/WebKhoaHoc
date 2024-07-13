import blogSchema from "../model/blogSchema.js";
import UserModel from "../model/userSchema.js";

class Blog {
  // Lấy dữ liệu từ MongoDB
  async getBlog(req, res) {
    try {
      const data = await blogSchema.find({}).populate("authorId");
      if (data) {
        res.send({
          status: true,
          message: "GetBlog Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log("getProducrs False" + error);
    }
  }
  // Lấy dữ liệu theo id
  async getBlogId(req, res) {
    try {
      const data = await blogSchema
        .findById(req.params.id)
        .populate("authorId");
      if (data) {
        res.send({
          status: true,
          message: "GetBlogId Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log("GetBlogId False" + error);
    }
  }
  async getBlogSlug(req, res) {
    try {
      const data = await blogSchema.findOne({ slug: req.params.slug });
      if (data) {
        res.send({
          status: true,
          message: "GetBlog Successfully",
          data,
        });
      }
    } catch (error) {
      console.log("GetBlog False" + error);
    }
  }
  // Thêm dữ liệu vào MongoDB
  async postBlog(req, res) {
    try {
      const data = await blogSchema.create(req.body);
      const updateUser = await UserModel.findByIdAndUpdate(
        data.blogId,
        {
          $push: { blogId: data._id },
        },
        { new: true }
      );
      if (!data || !updateUser) {
        return res.status(400).json({ message: "Add Course False" });
      }
      res.send({
        status: true,
        message: "Add Blog Successfully",
        data,
      });
    } catch (error) {
      console.log("PostBlog False" + error);
    }
  }

  async updateLikeBlog(req, res) {
    try {
      const data = await blogSchema.findByIdAndUpdate(
        `${req.params.id}`,
        { $set: { like: req.body.like } },
        {
          new: true,
        }
      );
      if (data) {
        res.send({
          status: true,
          message: "Update Blog Successfully",
          data,
        });
      } else {
        res.send({ status: false, message: "Update Like Blog False" });
      }
    } catch (error) {
      console.log("Update Like Blog False" + error);
    }
  }

  // Cập nhật dữ liệu Blog vào MongoDB
  async updateBlog(req, res) {
    try {
      const data = await blogSchema.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        {
          new: true,
        }
      );
      if (data) {
        res.send({
          status: true,
          message: "Update Blog Successfully",
          data,
        });
      } else {
        res.send({ status: false, message: "Update Blog False" });
      }
    } catch (error) {
      console.log("Update Blog False" + error);
    }
  }

  // Xóa cứng Blog trong MongoDB
  async removeBlogById(req, res) {
    try {
      const data = await blogSchema.findByIdAndDelete(req.params.id);
      if (data) {
        res.send({
          status: true,
          message: "Remove Blog Successfully",
        });
      }
    } catch (error) {
      console.log("DeleteBlog False" + error);
    }
  }

  // Xóa mềm Blog trong MongoDB
  async softRemoveBlogById(req, res) {
    try {
      const data = await blogSchema.findByIdAndUpdate(
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
        res.send({ status: true, message: "Soft Remove Blog Successfully" });
      }
    } catch (error) {
      console.log("softRemoveBlogById Blog Successfully");
    }
  }
}

export default Blog;
