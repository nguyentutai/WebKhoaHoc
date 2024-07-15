import { populate } from "dotenv";
import orderSchema from "../model/orderSchema.js";
import UserModel from "../model/userSchema.js";

class User {
  // Lấy dữ liệu từ MongoDB
  async getUser(req, res) {
    try {
      // Thực hiện kết nỗi sang conlection user và course
      const data = await UserModel.find({})
        .populate("blogId")
        .populate("orderId");
      if (data && data.length > 0) {
        return res.status(200).json({
          message: "Get User Successfully",
          data: data,
        });
      }
    } catch (error) {
      console.log("getUser False " + error);
    }
  }
  async getUserId(req, res) {
    try {
      // Thực hiện kết nỗi sang conlection user và course
      const data = await UserModel.findById(req.params.id)
        .populate("blogId")
        .populate({
          path: "orderId",
          populate: {
            path: "courseId",
            model: "courses",
          },
        });
      return res.status(200).json({
        message: "Get UserId Successfully",
        data: data,
      });
    } catch (error) {
      console.log("getUser False" + error);
    }
  }
  // Lấy dữ liệu theo id
  //   async getOrderById(req, res) {
  //     try {
  //       const data = await orderSchema
  //         .findById(req.params.id)
  //         .populate("userId", "email username _id")
  //         .populate("courseId");
  //       if (data) {
  //         res.status(200).json({
  //           status: true,
  //           message: "getOrderById Successfully",
  //           data: data,
  //         });
  //       }
  //     } catch (error) {
  //       console.log("getOrderById False" + error);
  //     }
  //   }
  //   async getOrderByUserId(req, res) {
  //     try {
  //       const data = await orderSchema
  //         .findById(req.params.id)
  //         .populate("userId", "email username _id")
  //         .populate("courseId");
  //       if (data) {
  //         res.status(200).json({
  //           status: true,
  //           message: "getOrderById Successfully",
  //           data: data,
  //         });
  //       }
  //     } catch (error) {
  //       console.log("getOrderById False" + error);
  //     }
  //   }
  //   // Thêm dữ liệu vào MongoDB
  //   async postOrder(req, res) {
  //     try {
  //       const data = await orderSchema.create(req.body);
  //       const updateOrder = await UserModel.findByIdAndUpdate(
  //         data.orderId,
  //         {
  //           $push: { orderId: data._id },
  //         },
  //         { new: true }
  //       );
  //       if (!data || !updateOrder) {
  //         return res.status(400).json({ message: "Add Course False" });
  //       }
  //       res.status(201).json({
  //         status: true,
  //         message: "Add Order Successfully",
  //         data: data,
  //       });
  //     } catch (error) {
  //       console.log("Add Order False" + error);
  //     }
  //   }

  //   // Cập nhật dữ liệu Order vào MongoDB
  //   async updateOrder(req, res) {
  //     try {
  //       const data = await orderSchema.findByIdAndUpdate(
  //         `${req.params.id}`,
  //         req.body,
  //         {
  //           new: true,
  //         }
  //       );
  //       if (data) {
  //         res.send({
  //           status: true,
  //           message: "Update Order Successfully",
  //           data: data,
  //         });
  //       } else {
  //         res.send({ status: false, message: "Update Order False" });
  //       }
  //     } catch (error) {
  //       console.log("Update Order False" + error);
  //     }
  //   }

  //   // Xóa cứng Order trong MongoDB
  //   async removeOrderById(req, res) {
  //     const data = await orderSchema.findByIdAndDelete(req.params.id);
  //     if (data) {
  //       return res.status(200).json({
  //         message: "Delete Order Successfully!",
  //         data: data,
  //       });
  //     }
  //     return res.status(400).json({ message: "Delete Order False" });
  //   }

  //   // Xóa mềm Order trong MongoDB
  //   async softRemoveCategoryById(req, res) {
  //     try {
  //       const data = await orderSchema.findByIdAndUpdate(
  //         `${req.params.id}`,
  //         {
  //           status: true,
  //           hide: true,
  //         },
  //         {
  //           new: true,
  //         }
  //       );
  //       if (data) {
  //         res.send({
  //           status: true,
  //           message: "Soft Remove Order Successfully",
  //         });
  //       }
  //     } catch (error) {
  //       console.log("softRemoveCourseById Order False");
  //     }
  //   }
}

export default User;
