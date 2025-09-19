import { Router } from "express";
import { checkUserExists } from "../middleware/check.user.exist.ts";
import { programarCorreo } from "../controllers/user.controller.ts";

const router = Router();

// POST /mail/programar
router.post("/programar", checkUserExists, programarCorreo);

export default router;
