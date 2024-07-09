import UserModel from "../model/userSchema.js"
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken"
export const register = async (req, res) => {
    try {
        const checkMail = await UserModel.findOne({ email: req.body.email });
        if (checkMail)
            return res.status(201).json({
                message: "Email đã tồn tại",
                ok: false
            })
        const passwordhash = await bcryptjs.hash(req.body.password, 10);
        const user = await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: passwordhash,
        });
        user.password = undefined;
        return res.status(201).json({
            message: "Đăng kí thành công",
            data: user,
            ok: true
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

export const login = async (req, res) => {
    try {
        const checkMail = await UserModel.findOne({ email: req.body.email });
        if (!checkMail)
            return res.status(201).json({
                message: "Email không tồn tại",
                ok: false
            })
        const passwordcompe = await bcryptjs.compare(req.body.password, checkMail.password);
        if (!passwordcompe)
            return res.status(201).json({
                message: "Mật khẩu không chính xác",
                ok: false
            })
        const token = await Jwt.sign({ uid: checkMail._id }, "matkhaucuatai" ,{
            expiresIn: "1d"
        })
        return res.status(201).json({
            message: "Đăng nhập thành công",
            token: token,
            user: checkMail.username,
            ok: true
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}
