import { Router } from "express";
import { removeComment, updateComment } from "../controllers/comments";

const router = Router();

router.patch("/:comment_id", updateComment);
router.delete("/:comment_id", removeComment);

export default router;
