import { db } from "../../db/connection";
import { CreateAlbumDto } from "../dtos/CreateAlbum.dto";

export async function fetchAlbums() {
    const { rows } = await db.query(
        `SELECT * FROM albums;`
    )

    return rows
}

export async function fetchAlbum(album_id: number) {
    const { rows } = await db.query(`SELECT * FROM albums WHERE album_id = $1;`, [album_id]);

    if(!rows.length) return Promise.reject({status: 404, msg:"Not Found"})
    return rows[0];
}

export async function createAlbum({ name, artist, cover_art }: CreateAlbumDto) {    
    const { rows } = await db.query(
        `INSERT INTO albums(name, artist, cover_art)
    VALUES ($1, $2, $3)
    RETURNING *;`,
        [name, artist, cover_art]
    )   
    return rows[0]
}