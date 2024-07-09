import bannerSchema from "../model/bannerSchema.js";

class Banner {
    async getBanner(req, res) {
        try {
            const dataPro = await bannerSchema.find();
            res.send(dataPro);
        } catch (error) {
            console.log('getProducrs False' + error);
        }
    }

    // Lấy dữ liệu theo id
    async getBannerId(req, res) {
        try {
            const dataPro = await bannerSchema.findById(req.params.id);
            if(dataPro){
                res.send({
                    status: true,
                    message: 'getProducrId Successfully',
                    dataPro
                })
            }
        } catch (error) {
            console.log('getProducrId False' + error);
        }
    }

    // Thêm dữ liệu vào MongoDB
    async postBanner(req, res) {
        try {
            const dataPro = await bannerSchema.create(req.body);
            res.send({
                status: true,
                message: 'Add banner Successfully',
                dataPro
            })
        } catch (error) {
            console.log('postProducrs False' + error);
        }
    }

    // Cập nhật dữ liệu banner vào MongoDB
    async updateBanner(req, res) {
        try {
            const dataPro = await bannerSchema.findByIdAndUpdate(
                `${req.params.id}`,
                req.body,
                {
                    new: true,
                }
            )
            if (dataPro) {
                res.send({ status: true, message: 'Update banner Successfully', dataPro });
            } else {
                res.send({ status: false, message: 'Update banner False' })
            }
        } catch (error) {
            console.log('Update banner False' + error);
        }
    }

    // Xóa cứng banner trong MongoDB
    async removeBannerById(req, res) {
        try {
            const dataPro = await bannerSchema.findByIdAndRemove(req.params.id);
            if (dataPro) {
                res.send({
                    status: true,
                    message: "Remove banner Successfully"
                }
                )
            }
        } catch (error) {
            console.log('deleteProducrs False' + error);
        }
    }

    // Xóa mềm banner trong MongoDB
    async softRemoveBannerById(req, res) {
        try {
            const dataPro = await bannerSchema.findByIdAndUpdate(
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
                res.send({ status: true, message: "Soft Remove banner Successfully" });
            }
        } catch (error) {
            console.log('softRemovebannerById banner Successfully');
        }
    }
}

export default Banner;