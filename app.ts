import signupRouter from "./src/routes/signup";
import loginRouter from "./src/routes/login";
import { Express } from "express";
import logoutRouter from "./src/routes/logout";
import universityRouter from "./src/routes/university";
import userRouter from "./src/routes/user";
import userContactRouter from "./src/routes/userContact";
import contactInfoRouter from "./src/routes/contactInfo";
import secSchoolRouter from "./src/routes/secSchool"
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
