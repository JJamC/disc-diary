import { NextFunction, Request, Response } from "express";
import { fetchTracks } from "../models/tracks";

export async function getTracks(req: Request<{album_id: number}, {}, {}>, res: Response, next: NextFunction) {
    try {
        const { album_id } = req.params
        const tracks = await fetchTracks(album_id)
        res.status(200).send({ tracks })
    }
    catch (err) {
        next(err)
    }
}
