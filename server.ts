import express from "express";
import { config } from "dotenv";
import { connectDB } from "./startup/db";
import { RouteHandler } from "./app";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./startup/cors";

const app = express();
config();

connectDB();
app.use(express.json());
app.use(cookieParser());

// app.use(cors(corsOptions));
app.use(cors());
process.env.NODE_ENV == "production" ? app.use(helmet()) : "";
RouteHandler(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
