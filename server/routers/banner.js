import { Router } from "express";
import Banner from "../controllers/banner.js";

const bannerRouter = Router();

const bannerController = new Banner();
// Lấy dữ liệu từ MongoDB
bannerRouter.get('/banners', bannerController.getBanner);
// Lấy dữ liệu theo id
bannerRouter.get('/banners/:id', bannerController.getBannerId);
// Thêm dữ liệu vào MongoDB
bannerRouter.post('/banners', bannerController.postBanner);
// Cập nhật dữ liệu banner vào MongoDB
bannerRouter.put('/banners/:id', bannerController.updateBanner);
// Xóa cứng banner trong MongoDB
bannerRouter.delete('/banners/:id', bannerController.removeBannerById);
// Xóa mềm banner trong MongoDB
bannerRouter.put('/banners/:id', bannerController.softRemoveBannerById);

export default bannerRouter;
