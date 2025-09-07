import express from "express";
import { ProductController, upload } from "../controllers/ProductController.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";

const router = express.Router();

router.get("/", ProductController.getAll);

router.post("/", upload.single("image"), ProductController.create);

router.delete("/:id", checkAdmin, ProductController.delete);

router.patch("/carousel", checkAdmin, ProductController.toggleCarousel);
router.patch("/destacado", checkAdmin, ProductController.toggleDestacado);

export default router;
