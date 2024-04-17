import signupRouter from "./routes/signup";
import loginRouter from "./routes/login";
import { Express } from "express";
import logoutRouter from "./routes/logout";
import overviewRouter from "./routes/overview";
import universityRouter from "./routes/university";
import userRouter from "./routes/user";

export const RouteHandler = async (app: Express) => {
  app.use("/api/signup", signupRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/logout", logoutRouter);
  app.use("/api/overview", overviewRouter);
  app.use("/api/university", universityRouter);
  app.use("/api/user", userRouter);
};
