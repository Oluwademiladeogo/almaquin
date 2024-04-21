import express from "express";
import { config } from "dotenv";
import { connectDB } from "./startup/db";
import { RouteHandler } from "./app";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors"

const app = express();
config();

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(helmet());
RouteHandler(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
