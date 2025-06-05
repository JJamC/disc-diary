import { db } from "../../db/connection";

export async function fetchUsers() {
    return await db.query(`SELECT * FROM users;`)
}