const db = require('../connection')

const seed = async ({ commentsData, postData, usersData }) => {
    await db.query(`DROP TABLE IF EXISTS comments`)
    await db.query(`DROP TABLE IF EXISTS articles`)
    await db.query(`DROP TABLE IF EXISTS users`);

    await db.query(`CREATE TABLE users ( 
        user_id SERIAL PRIMARY KEY, 
        username VARCHAR PRIMARY KEY,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        avatar_url VARCHAR);`);
    await db.query(`CREATE TABLE albums (
    album_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL
);`);
    await db.query(`CREATE TABLE tracks (
    track_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT REFERENCES users(user_id)
    body TEXT,
    cover_art TEXT,
    album_id INT REFERENCES albums(album_id)
)`)
    await db.query(`CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(user_id),
    body TEXT NOT NULL,
    album_id INT REFERENCES albums(album_id)
);`);
    await insertUsers(usersData)
}

async function insertUsers(usersData) {
    const insertUserQueryStr = format(
      `INSERT INTO users (username, email, password, avatar_url) VALUES %L`,
      userData.map(({ username, email, password, avatar_url }) => [
        username,
        email,
        password,
        avatar_url,
      ])
    )
    const usersPromise =  db.query(insertUserQueryStr)
}

//sort foregin keys