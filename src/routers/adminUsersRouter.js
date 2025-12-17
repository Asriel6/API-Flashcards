import { Router } from "express";
import { authenticatetoken } from "../middleware/authenticateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
    getAllUsers,
    getUserById,
    deleteUserById,
} from "../controllers/adminUserController.js";

const router = Router();

router.use(authenticatetoken);
router.use(isAdmin);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

export default router;
