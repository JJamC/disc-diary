import { NextFunction, Request, Response } from "express";
import { fetchPosts } from "../models/posts";

export async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const posts = await fetchPosts()
        res.status(200).send({ posts })
    }
    catch (err) {
        next(err)
    }
}
