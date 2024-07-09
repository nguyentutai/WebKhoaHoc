import { useForm } from "react-hook-form";
import IRegister from "../../interfaces/Auth/IRegister";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegister>();
  const navidate = useNavigate();
  const submit = (data: IRegister) => {
    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          toast.success("Đăng kí thành công");
          navidate("/login");
        } else {
          toast.error("Email đã tồn tại");
        }
      })
      .catch((err) => {
        toast.error("Đăng kí không thành công");
      });
  };
  return (
    <div id="register">
      <div className="content-left">
        <h2>Register</h2>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa-brands fa-google-plus-g"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
        <form action="" onSubmit={handleSubmit(submit)}>
          <div className="username">
            <input
              type="text"
              placeholder="Username"
              id="username"
              {...register("username", {
                required: "Vui lòng nhập tên tài khoản",
                minLength: {
                  value: 6,
                  message: "Tên tài khoản phải dài hơn 6 kí tự",
                },
              })}
            />
          </div>
          <div className="error">{errors.username?.message}</div>
          <div className="email">
            <input
              type="email"
              placeholder="Email"
              id="email"
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email không đúng định dạng",
                },
              })}
            />
          </div>
          <div className="error">{errors.email?.message}</div>
          <div className="password">
            <input
              type="password"
              placeholder="Password"
              id="password"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải dài hơn 6 kí tự",
                },
              })}
            />
          </div>
          <div className="error">{errors.password?.message}</div>
          <div className="confirmpass">
            <input
              type="password"
              placeholder="Confirmpass"
              id="confirmpass"
              {...register("confirmPassword", {
                required: "Vui lòng nhập xác nhận mật khẩu",
                validate: (value) => {
                  if (value != watch("password"))
                    return "Xác nhận mật khẩu không khớp";
                },
              })}
            />
          </div>
          <div className="error">{errors.confirmPassword?.message}</div>
          <button className="bounce-top" id="btnRegister" type="submit">
            Register
          </button>
        </form>
      </div>
      <div className="content-right swing-in-left-fwd color-change-2x">
        <h2>Hello, Friend!</h2>
        <p>Register with your personal details to use all of site features</p>
        <button type="button">
          <Link to={"/login"}>Login</Link>
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
