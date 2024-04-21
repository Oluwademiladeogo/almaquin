
import {Router} from "express"
import { authenticateUser, ensureAdmin } from "../middlewares/auth"
import { addUsefulLinks, deleteUsefulLink, getUsefulLinks, updateUsefulLinks } from "../controllers/usefulLink"
const router = Router()
router.get("/", authenticateUser, getUsefulLinks)
router.post("/", ensureAdmin, addUsefulLinks)
router.put("/", ensureAdmin, updateUsefulLinks)
router.delete("/", ensureAdmin, deleteUsefulLink)
