import express from "express";
import { config } from "dotenv";
const app = express();
config();
const { PORT } = process.env;
import { connectDB } from "./startup/db";
connectDB();
app.use(express.json());
app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
