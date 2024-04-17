import {Router} from "express"
import { authenticateUser, ensureAdmin } from "../middlewares/auth";
import { getAllUsers, getCurrentUser } from "../controllers/user";
const router = Router()
router.get("/me", authenticateUser, getCurrentUser);
router.get("/all", ensureAdmin, getAllUsers);

export default router;