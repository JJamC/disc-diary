import { NextFunction, Request, Response } from "express";
import { fetchAlbums, createAlbum, fetchAlbum } from "../models/albums";

export async function getAlbums(req: Request<{}, {}, {}, { sort_by: string, order: string }>, res: Response, next: NextFunction) {
    
    const {sort_by, order} = req.query

    try {
        const albums = await fetchAlbums(sort_by, order)
        res.status(200).send({ albums })
    }
    catch (err) {
        next(err)
    }
}

export async function getAlbum(req: Request<{album_id: number}, {}, {}>, res: Response, next: NextFunction) {
    try {
        const { album_id } = req.params
        const album = await fetchAlbum(album_id)
        res.status(200).send({ album })
    }
    catch (err) {
        next(err)
    }
}

export async function postAlbum(
  req: Request,
  res: Response,
  next: NextFunction
) { 
    try {
    const  newAlbum  = req.body
    const album = await createAlbum(newAlbum);
    res.status(201).send({ album });
    } catch (err) {
    next(err);
  }
}