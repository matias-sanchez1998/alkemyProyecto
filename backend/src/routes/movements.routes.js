import { Router } from "express";
import { getMovements,postMovement,deleteMovements,updateMovements } from "../controllers/movements.controller.js";
const router = Router();

router.get("", getMovements);
router.post("", postMovement);
router.delete("/:id", deleteMovements);
router.patch("/:id", updateMovements);
export default router;
1