import { useForm } from "react-hook-form";
import ILogin from "../../interfaces/Auth/ILogin";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginProvider";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navidate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const { dispathLogin } = useContext(LoginContext);

  const submit = async (data: ILogin) => {
    try {
      const resuilt = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datas = await resuilt.json();
      if (datas.ok) {
        localStorage.setItem("token", datas.token);
        sessionStorage.setItem("user", JSON.stringify(datas.user));
        dispathLogin({
          type: "login",
        });
        toast.success("Login successfully");
        navidate("/blog");
      } else {
        toast.error(datas.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="login">
      <div className="content-right-log swing-in-right-fwd color-change-2x">
        <h2>Welcome Back!</h2>
        <p>Enter your personal details to use all of site features</p>
        <button type="button">
          <Link to={"/register"}>Register</Link>
        </button>
      </div>
      <div className="content-left">
        <h2>Login</h2>
        <div className="social-icons">
          <Link to={"http://localhost:3000/auth/google"} className="icon">
            <i className="fa-brands fa-google-plus-g"></i>
          </Link>
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
          <div className="email">
            <input
              type="text"
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
                  message: "Mật khẩu lớn hơn 6 kí tự",
                },
              })}
            />
          </div>
          <div className="error">{errors.password?.message}</div>
          <button className="bounce-top" id="btnLogin" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
