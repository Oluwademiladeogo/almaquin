import signupRouter from "./routes/signup";
import loginRouter from "./routes/login";
import { Express } from "express";

export const RouteHandler = async (app: Express) => {
  app.use("/api/signup", signupRouter);
  app.use("/api/login", loginRouter);

};
