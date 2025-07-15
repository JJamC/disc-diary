import { NextFunction, Request, Response } from "express";
import { deleteComment, patchComment } from "../models/comments";


export async function updateComment(
  req: Request<{ comment_id: number }, {}, {body: string}>,
  res: Response,
  next: NextFunction
) {
    const { comment_id } = req.params;
    const { body } = req.body
  try {
    const comment = await patchComment(body, comment_id);
    res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
}

export async function removeComment(
  req: Request<{ comment_id: number }>,
  res: Response,
  next: NextFunction
) {
  const { comment_id } = req.params;
  try {
    await deleteComment(comment_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}