import { db } from "../../db/connection";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreatePostDto } from "../dtos/CreatePost.dto";

export async function fetchUsers() {
  const { rows } = await db.query(`SELECT * FROM users;`);
  return rows;
}

export async function fetchUser(user_id: number) {
  const { rows } = await db.query(`SELECT * FROM users WHERE user_id = $1;`, [
    user_id,
  ]);
  if (!rows.length) return Promise.reject({ status: 404, msg: "Not Found" });
  return rows[0];
}

export async function createUser({
  username,
  email,
  password,
  avatar_url,
}: CreateUserDto) {
  const { rows } = await db.query(
    `INSERT INTO users(username, email, password, avatar_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
    [username, email, password, avatar_url]
  );

  return rows[0];
}

export async function updateUserUsername(username: string, userId: number) {
  const { rows } = await db.query(
    `UPDATE users
        SET username = $1
        WHERE user_id = $2
        RETURNING *;`,
    [username, userId]
  );

  if (!rows.length) return Promise.reject({ status: 404, msg: "Not Found" });

  return rows[0];
}

export async function deleteUser(user_id: number) {
  await db.query(
    `DELETE FROM comments 
    WHERE author_id = $1;`,
    [user_id]
  );
  await db.query(
    `DELETE FROM posts 
      WHERE author_id = $1;`,
    [user_id]
  );

  const { rows } = await db.query(
    `DELETE FROM users 
    WHERE user_id = $1
    RETURNING *;`,
    [user_id]
  );

  if (!rows.length) return Promise.reject({ status: 404, msg: "Not Found" });
}

export async function fetchPostsByUser(
  user_id: number,
  sort_by: string = "created_at",
  order: string = "ASC"
) {
  let queryStr = "SELECT * FROM posts WHERE author_id=$1 ";

  const validSortBy = ["created_at", "votes"];

  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  queryStr += `ORDER BY ${sort_by} ${order}`;

  const { rows } = await db.query(queryStr, [user_id]);

  if (!rows.length) return Promise.reject({ status: 404, msg: "Not Found" });

  return rows;
}

export async function postByUser(
  { body, album_id }: CreatePostDto,
  user_id: number
) {
  const { rows } = await db.query(
    `INSERT INTO posts(author_id, body, album_id, votes)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
    [user_id, body, album_id, 0]
  );

  return rows[0];
}
