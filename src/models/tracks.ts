import { db } from "../../db/connection";

export async function fetchTracks(album_id : number) {
    const { rows } = await db.query(
        `SELECT * FROM tracks WHERE album_id = $1;`, [album_id]
    )

    return rows
}