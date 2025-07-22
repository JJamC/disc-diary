import { db } from "../../db/connection";

export async function fetchTracks(album_id: number) {
  const { rows } = await db.query(`SELECT * FROM tracks WHERE album_id = $1;`, [
    album_id,
  ]);

  if (!rows.length) return Promise.reject({ status: 404, msg: "Not Found" });

  return rows;
}
