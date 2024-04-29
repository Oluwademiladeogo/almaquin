import signupRouter from "./routes/signup";
import loginRouter from "./routes/login";
import { Express } from "express";
import logoutRouter from "./routes/logout";
import universityRouter from "./routes/university";
import userRouter from "./routes/user";
import userContactRouter from "./routes/userContact";
import contactInfoRouter from "./routes/contactInfo";
import secSchoolRouter from "./routes/secSchool"
export const RouteHandler = async (app: Express) => {
  app.use("/api/signup", signupRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/logout", logoutRouter);
  app.use("/api/university", universityRouter);
  app.use("/api/user", userRouter);
  app.use("/api/send-a-message", userContactRouter);
  app.use("/api/contact", contactInfoRouter);
  app.use("/api/sec-schools", secSchoolRouter)
};
