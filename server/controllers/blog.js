import blogSchema from "../model/blogSchema.js";

class Blog {
  // Lấy dữ liệu từ MongoDB
  async getBlog(req, res) {
    try {
      const dataPro = await blogSchema.find();
      res.send(dataPro);
    } catch (error) {
      console.log("getProducrs False" + error);
    }
  }
  // Lấy dữ liệu theo id
  async getBlogId(req, res) {
    try {
      const dataPro = await blogSchema.findById(req.params.id);
      if (dataPro) {
        res.send({
          status: true,
          message: "getProducrId Successfully",
          dataPro,
        });
      }
    } catch (error) {
      console.log("getProducrId False" + error);
    }
  }

  // Thêm dữ liệu vào MongoDB
  async postBlog(req, res) {
    try {
      const dataPro = await blogSchema.create(req.body);
      res.send({
        status: true,
        message: "Add Blog Successfully",
        dataPro,
      });
    } catch (error) {
      console.log("postProducrs False" + error);
    }
  }

  // Cập nhật dữ liệu Blog vào MongoDB
  async updateBlog(req, res) {
    try {
      const dataPro = await blogSchema.findByIdAndUpdate(
        `${req.params.id}`,
        req.body,
        {
          new: true,
        }
      );
      if (dataPro) {
        res.send({
          status: true,
          message: "Update Blog Successfully",
          dataPro,
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
      const dataPro = await blogSchema.findByIdAndRemove(req.params.id);
      if (dataPro) {
        res.send({
          status: true,
          message: "Remove Blog Successfully",
        });
      }
    } catch (error) {
      console.log("deleteProducrs False" + error);
    }
  }

  // Xóa mềm Blog trong MongoDB
  async softRemoveBlogById(req, res) {
    try {
      const dataPro = await blogSchema.findByIdAndUpdate(
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
        res.send({ status: true, message: "Soft Remove Blog Successfully" });
      }
    } catch (error) {
      console.log("softRemoveBlogById Blog Successfully");
    }
  }
}

export default Blog;
