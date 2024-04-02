import express from "express";
import { config } from "dotenv";
const app = express();
config();
const port = process.env.PORT || 3000;
import { connectDB } from "./startup/db";
import { RouteHandler } from "./app";
connectDB();
app.use(express.json());
RouteHandler(app)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
