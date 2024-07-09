import courseSchema from "../model/courseSchema.js";

class Course {
    // Lấy dữ liệu từ MongoDB
    async getCourse(req, res) {
        try {
            const dataPro = await courseSchema.find();
            res.send(dataPro);
        } catch (error) {
            console.log('getProducrs False' + error);
        }
    }
    // Lấy dữ liệu theo id
    async getCourseId(req, res) {
        try {
            const dataPro = await courseSchema.findById(req.params.id);
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
    async postCourse(req, res) {
        try {
            const dataPro = await courseSchema.create(req.body);
            res.send({
                status: true,
                message: 'Add Course Successfully',
                dataPro
            })
        } catch (error) {
            console.log('postProducrs False' + error);
        }
    }

    // Cập nhật dữ liệu Course vào MongoDB
    async updateCourse(req, res) {
        try {
            const dataPro = await courseSchema.findByIdAndUpdate(
                `${req.params.id}`,
                req.body,
                {
                    new: true,
                }
            )
            if (dataPro) {
                res.send({ status: true, message: 'Update Course Successfully', dataPro });
            } else {
                res.send({ status: false, message: 'Update Course False' })
            }
        } catch (error) {
            console.log('Update Course False' + error);
        }
    }

    // Xóa cứng Course trong MongoDB
    async removeCourseById(req, res) {
        try {
            const dataPro = await courseSchema.findByIdAndRemove(req.params.id);
            if (dataPro) {
                res.send({
                    status: true,
                    message: "Remove Course Successfully"
                }
                )
            }
        } catch (error) {
            console.log('deleteProducrs False' + error);
        }
    }

    // Xóa mềm Course trong MongoDB
    async softRemoveCourseById(req, res) {
        try {
            const dataPro = await courseSchema.findByIdAndUpdate(
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
                res.send({ status: true, message: "Soft Remove Course Successfully" });
            }
        } catch (error) {
            console.log('softRemoveCourseById Course Successfully');
        }
    }
}

export default Course;
