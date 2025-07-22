import { Router } from "express";

import {
  getPosts,
  updatePost,
  createComment,
  getComments,
} from "../controllers/posts";

const router = Router();

router.get("/", getPosts);
router.get("/:post_id/comments", getComments);
router.post("/:post_id/comments", createComment);
router.patch("/:post_id", updatePost);

export default router;
