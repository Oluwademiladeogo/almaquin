import signupRouter from "./routes/signup";
import loginRouter from "./routes/login";
import { Express } from "express";
import logoutRouter from "./routes/logout";
import universityRouter from "./routes/university";
import userRouter from "./routes/user";
import faqRouter from "./routes/faq";

export const RouteHandler = async (app: Express) => {
  app.use("/api/signup", signupRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/logout", logoutRouter);
  app.use("/api/university", universityRouter);
  app.use("/api/user", userRouter);
  app.use("/api/faq", faqRouter);

};
