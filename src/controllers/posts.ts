import { NextFunction, Request, Response } from "express";
import {
  patchPost,
  deletePostsByUser,
  fetchPosts,
  fetchComments,
  postComment,
} from "../models/posts";
import { CreateCommentDto } from "../dtos/CreateComment.dto";

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = await fetchPosts();
    res.status(200).send({ posts });
  } catch (err) {
    next(err);
  }
}

export async function removePostsByUser(
  req: Request<{ user_id: number }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req.params;
  try {
    await deletePostsByUser(user_id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function updatePost(
  req: Request<{ post_id: number }, {}, { body: string }>,
  res: Response,
  next: NextFunction
) {
  const { post_id } = req.params;
  const { body } = req.body;
  try {
    const updatedPost = await patchPost(post_id, body);
    res.status(200).send({ updatedPost });
  } catch (err) {
    next(err);
  }
}

export async function getComments(
  req: Request<{ post_id: number }>,
  res: Response,
  next: NextFunction
) {
  const { post_id } = req.params;
  try {
    const comments = await fetchComments(post_id);
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
}

export async function createComment(
  req: Request<{ post_id: number }, {}, CreateCommentDto>,
  res: Response,
  next: NextFunction
) {
  const { post_id } = req.params;
  const { body, author_id } = req.body;
  try {
    const comment = await postComment(body, author_id, post_id);

    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
}
