import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginProvider";
import { toast } from "react-toastify";

const LoginSusscess = () => {
  const { dispathLogin } = useContext(LoginContext);
  const nav = useNavigate();
  const { userId } = useParams();
  useEffect(() => {
    (async () => {
      const resuilt = await fetch(
        `http://localhost:3000/auth/login-success/${userId}`
      );
      const data = await resuilt.json();
      if (data) {
        sessionStorage.setItem("user", JSON.stringify(data.data));
        dispathLogin({
          type: "login",
        });
        toast.success("Login successfully");
        nav("/");
      }
    })();
  }, [userId]);
  return <>Hello</>;
};

export default LoginSusscess;
