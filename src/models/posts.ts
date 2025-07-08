import { db } from "../../db/connection";

export async function fetchPosts() {
    const { rows } = await db.query(`SELECT * FROM posts;`)
    

    return rows
}