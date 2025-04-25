import express from "express";
import { getUserCanvases, loadCanvas, createCanvas, updateCanvas, deleteCanvas } from "../controllers/canvasControllers.js";
import protect from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/list", protect, getUserCanvases);
router.get("/load/:id", protect, loadCanvas);
router.post("/create", protect, createCanvas);
router.put("/update", protect, updateCanvas);
router.delete("/delete/:id", protect, deleteCanvas)
export default router;