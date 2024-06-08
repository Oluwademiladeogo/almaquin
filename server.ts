import express from "express";
import { config } from "dotenv";
import { connectDB } from "./src/startup/db";
import { RouteHandler } from "./app";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./src/startup/cors";
import errorHandler from "./src/middlewares/error";

const app = express();
config();

connectDB();
app.use(express.json());
app.use(cookieParser());
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// process.env.NODE_ENV == "production" ? app.use(helmet()) : "";
RouteHandler(app);
app.use(errorHandler)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
