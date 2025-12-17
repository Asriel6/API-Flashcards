import { Router } from "express";
import { validateBody } from "../middleware/validation.js";
import { loginSchema, registerSchema } from "../models/authModels.js";
import { register, login } from "../controllers/authController.js";


const router = Router()

router.post('/register', validateBody(registerSchema), register)
router.post('/login', validateBody(loginSchema), login)

export default router;