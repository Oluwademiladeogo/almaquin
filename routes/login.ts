import { Request, Response, Router } from "express";
import { loginController } from "../controllers/login";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    
  if (!req.cookies?.authToken) {
    const data: any = await loginController(req.body);
    if (data.token) {
      res
        .cookie("authToken", data.token)
        .status(data.status)
        .json({ message: data.message });
    } else {
      res.status(data.status).json({ message: data.message });
    }
  }
});

export default router;
