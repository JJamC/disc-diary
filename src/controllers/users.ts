import { NextFunction, Request, Response } from "express";
import {
  fetchUsers,
  updateUserUsername,
  createUser,
  deleteUser,
  fetchUser,
  fetchPostsByUser,
  postByUser,
} from "../models/users";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreatePostDto } from "../dtos/CreatePost.dto";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const users = await fetchUsers();
  res.status(200).send({ users });
}

export async function postUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser = req.body;
    const user = await createUser(newUser);
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
}

export async function getUser(
  req: Request<{ user_id: number }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const { user_id } = req.params;
    const user = await fetchUser(user_id);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
}

export async function patchUserUsername(
  req: Request<{ user_id: number }, {}, { username: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.body;
    const { user_id } = req.params;
    const user = await updateUserUsername(username, user_id);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
}

export async function removeUser(
  req: Request<{ user_id: number }, {}, {}>,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req.params;
  try {
    await deleteUser(user_id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function getPostsByUser(
  req: Request<{ user_id: number }, {}, {}, { sort_by: string; order: string }>,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req.params;
  const { sort_by, order } = req.query;

  try {
    const postsByUser = await fetchPostsByUser(user_id, sort_by, order);
    res.status(200).send({ postsByUser });
  } catch (err) {
    next(err);
  }
}

export async function makePostByUser(
  req: Request<{ user_id: number }, {}, CreatePostDto>,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req.params;
  const post = req.body;
  try {
    const newPost = await postByUser(post, user_id);
    res.status(201).send({ newPost });
  } catch (err) {
    next(err);
  }
}
