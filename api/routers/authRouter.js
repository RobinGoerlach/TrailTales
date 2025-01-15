import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getUser, signUp, signIn } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", signUp);
authRouter.post("/login", signIn);
authRouter.get("/me", verifyToken, getUser);

export default authRouter;
