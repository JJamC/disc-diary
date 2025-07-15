import { db } from "../../db/connection";

export async function patchComment(
  body: string,
comment_id: number){
  
  const { rows } = await db.query(
    `UPDATE comments
        SET body = $1
        WHERE comment_id = $2
        RETURNING *;`,
    [body, comment_id]
  );

  if (!rows.length) return Promise.reject({ status: 404, msg: "Not Found" });

  return rows[0];
}

export async function deleteComment(
  comment_id: number
) {
    const { rows } = await db.query(
    `DELETE FROM comments 
    WHERE comment_id = $1
    RETURNING *;`,
    [comment_id]
    );
    console.log(rows);
    
  
  if(!rows.length) return Promise.reject({ status: 404, msg: "Not Found"})
}