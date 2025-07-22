import { Router } from "express";

import {
  getPosts,
  updatePost,
  createComment,
  getComments,
  getPostById,
} from "../controllers/posts";

const router = Router();

router.get("/", getPosts);
router.get("/:post_id/comments", getComments);
router.get("/:post_id", getPostById);
router.post("/:post_id/comments", createComment);
router.patch("/:post_id", updatePost);

export default router;
