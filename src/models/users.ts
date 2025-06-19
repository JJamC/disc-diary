import { db } from "../../db/connection";
import { UserDto } from "../dtos/CreateUser.dto";

export async function fetchUsers() {
  const { rows } = await db.query(`SELECT * FROM users;`);
  return rows;
}

export async function createUser({ username, email, password, avatar_url }: UserDto) {
  const { rows } = await db.query(
    `INSERT INTO users(username, email, password, avatar_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
    [username, email, password, avatar_url]
  );

  return rows[0]
}

// export async function updateUser({
//   username,
//   email,
//   password,
//   avatar_url,
// }: UserDto) {
  // const { rows } = await db.query(
  //   `INSERT INTO users(username, email, password, avatar_url)
  //       VALUES ($1, $2, $3, $4)
  //       RETURNING *;`,
  //   [username, email, password, avatar_url]
  // );

  // return rows[0];
// }
