import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routers/authRouter.js";
import postsRouter from "./routers/postRouter.js";
import "./db/connect.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 3rc
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`));
