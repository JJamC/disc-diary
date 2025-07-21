import { db } from "../../db/connection";
import { CreateAlbumDto } from "../dtos/CreateAlbum.dto";

export async function fetchAlbums(sort_by: string = 'name', order: string = 'ASC') {

    let queryStr = 'SELECT * FROM albums '

    const validSortBy = ['name', 'artist']

    if (!validSortBy.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
    
    queryStr += `ORDER BY ${sort_by} ${order}`

    const { rows } = await db.query(queryStr)

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