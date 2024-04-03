import { Request, Response, Router } from "express";
import { signupController } from "../controllers/signup";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { status, message } = await signupController(req.body);
  res.status(status).json(message);
});

export default router;
