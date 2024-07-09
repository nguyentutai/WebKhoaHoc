import Joi from "joi";

const ValidateCourseJoi = Joi.object({
    title: Joi.string().required().empty().messages({
        "any.required": "Title không được để trống",
        "string.empty": "Title đề không được để trống"
    }),
    discount: Joi.number().required().empty().messages({
        "any.required": "Discount không được để trống",
        "number.empty": "Discount không được để trống"
    }),
    cornerprice: Joi.number().required().empty().messages({
        "any.required": "Cornerprice không được để trống",
        "number.empty": "Cornerprice không được để trống"
    }),
    image: Joi.string().required().empty().messages({
        "any.required": "Image không được để trống",
        "string.empty": "Image không được để trống"
    }),
    description: Joi.string().required().empty().messages({
        "any.required": "Description không được để trống",
        "string.empty": "Description không được để trống",
    })
})

const ValidateCourse = (req, res, next) => {
    try {
        const { title, discount, cornerprice, image, description } = req.body;
        const { error } = ValidateCourseJoi.validate({
            title,
            discount,
            cornerprice,
            image,
            description
        })
        if(error){
            res.send(error.message)
        }else{
            next();
        }
    } catch (error) {
        console.log(error.message);
    }
}

export default ValidateCourse;