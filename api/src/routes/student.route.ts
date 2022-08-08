import { Router } from "express";
import { upload } from "../middlewares";
import { catcher } from "../utils/catcher";
const studentController = require("../controllers/student.controller");
const router = Router();

router.get("/", catcher(studentController.getAll));
router.get("/:id", catcher(studentController.getOne));
router.post("/", upload.single("image"), studentController.createOne);
router.put("/:id", catcher(studentController.updateOne));
router.delete("/:id", catcher(studentController.deleteOne));

export default router;
