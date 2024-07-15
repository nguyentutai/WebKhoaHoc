import express from "express";
import connect from "./connect/conectMongoDb.js";
import bannerRouter from "./routers/banner.js";
import cors from "cors";
import courseRouter from "./routers/course.js";
import AuthRouter from "./routers/auth.js";
import blogRouter from "./routers/blog.js";
import categoryRouter from "./routers/category.js";
import orderRouter from "./routers/order.js";
import userRouter from "./routers/user.js";
import "./passport.js";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSISON,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", courseRouter);
app.use("/api", bannerRouter);
app.use("/api", orderRouter);
app.use("/auth", AuthRouter);
app.use("/api", blogRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);

app.listen(process.env.PORT, async () => {
  await connect();
  console.log(`http://localhost:${process.env.PORT}`);
});
