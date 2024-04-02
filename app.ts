import signupRouter from "./routes/signup";
import {Express} from "express"
export const RouteHandler = async (app:Express) => {
  app.use("/api/signup", signupRouter);
};

