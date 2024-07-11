import express from "express";
import connect from "./connect/conectMongoDb.js";
import bannerRouter from "./routers/banner.js";
import cors from "cors";
import courseRouter from "./routers/course.js";
import AuthRouter from "./routers/auth.js";
import blogRouter from "./routers/blog.js";
import categoryRouter from "./routers/category.js";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use("/api", courseRouter);
app.use("/api", bannerRouter);
app.use("/auth", AuthRouter);
app.use("/api", blogRouter);
app.use("/api", categoryRouter);

// Lắng nghe cổng
app.listen(port, async () => {
  await connect();
  console.log(`http://localhost:${port}`);
});
