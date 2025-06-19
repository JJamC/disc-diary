import { NextFunction, Request, Response } from "express";
import { fetchUsers } from "../models/users";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { createUser } from "../models/users";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    const users = await fetchUsers()    
    res.status(200).send({users})
}

export async function postUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
  next: NextFunction
) {
const newUser = req.body;

  const user = await createUser(newUser);
  res.status(201).send({ user });
}

export async function patchUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
  next: NextFunction
) {
//   const updatedField = req.body;

//   const user = await updateUser(updatedField);
//   res.status(201).send({ user });
}