import { db } from "../../db/connection";

export async function fetchPosts() {
    const { rows } = await db.query(`SELECT * FROM posts;`)
    
    return rows
}

export async function deletePostsByUser(user_id: number) {
    const { rows } = await db.query(
    `DELETE FROM posts 
      WHERE author_id = $1
      RETURNING *;`,
    [user_id]
  );

  if (!rows.length) return Promise.reject({ status: 404, msg: "Not Found" });
}

export async function patchPost(post_id: number, body: string) {
  const { rows } = await db.query(
    `UPDATE posts
        SET body = $1
        WHERE post_id = $2
        RETURNING *;`,
    [body, post_id]
  );


    if (!rows.length) return Promise.reject({ status: 404, msg: "Not Found" })
    
    return rows[0]
}