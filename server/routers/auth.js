import { Router } from "express";
import passport from "passport";
import { login, loginSuscess, register } from "../controllers/auth.js";

const AuthRouter = Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

AuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect(`http://localhost:5173/login-success/${req.user?.id}`);
  }
);

AuthRouter.get("/login-success/:id", loginSuscess);

export default AuthRouter;
