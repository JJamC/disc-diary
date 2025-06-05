import { NextFunction, Request, Response } from "express";
import { fetchUsers } from "../models/users";
import { CreateUserDto } from "../dtos/CreateUser.dto";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    const users = await fetchUsers()
    res.status(200).send({users})
}

export async function createUser(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
     
 }