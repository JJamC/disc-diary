const db = require("../connection");

const seed = async ({
  commentsData,
  postsData,
  usersData,
  albumsData,
  tracksData,
}) => {
  await db.query(`DROP TABLE IF EXISTS comments`);
  await db.query(`DROP TABLE IF EXISTS articles`);
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
    artist VARCHAR(255) NOT NULL,
    cover_art VARCHAR
);`);
  await db.query(`CREATE TABLE tracks (
    track_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    album_id VARCHAR(255) REFERENCES albums(album_id)
)`);
  await db.query(`CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(user_id),
    body TEXT NOT NULL,
    album_id INT REFERENCES albums(album_id),
    votes INT,
    created_at TIMESTAMP DEFAULT NOW()
);`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY
         body VARCHAR,
    votes INT,
    author_id INT REFERENCES users(user_id),
    posts_id INT REFERENCES posts(post_id),
    created_at TIMESTAMP DEFAULT NOW()
    );`);

  await insertUsers(usersData);
  await insertAlbums(albumsData);
  await insertTracks(tracksData);
  await insertPosts(postsData);
  await insertComments(commentsData);
};

async function insertUsers(usersData) {
  const insertUserQueryStr = format(
    `INSERT INTO users (username, email, password, avatar_url) VALUES %L`,
    usersData.map(({ username, email, password, avatar_url }) => [
      username,
      email,
      password,
      avatar_url,
    ])
  );
  await db.query(insertUserQueryStr);
}

async function insertAlbums(albumsData) {
  const insertAlbumQueryStr = format(
    `INSERT INTO albums (title, author_id, body, cover_art, album_id) VALUES %L`,
    albumsData.map(({ title, author_id, body, cover_art, album_id }) => [
      title,
      author_id,
      body,
      cover_art,
      album_id,
    ])
  );
  await db.query(insertAlbumQueryStr);
}

async function insertTracks(tracksData) {
  const insertTracksQueryStr = format(
    `INSERT INTO tracks (name, artist, cover_art, album_id) VALUES %L`,
    tracksData.map(({ title, album_id }) => [title, cover_art, album_id])
  );
  await db.query(insertTracksQueryStr);
}

async function insertPosts(postsData) {
  const insertPostsQueryStr = format(
    `INSERT INTO posts (author_id, body, album_id, votes, created_at) VALUES %L`,
    postsData.map(({ author_id, body, album_id, votes = 0, created_at }) => [
      author_id,
      body,
      album_id,
      votes,
      created_at,
    ])
  );
  await db.query(insertPostsQueryStr);
}

async function insertComments(commentsData) {
  const insertCommentsQueryStr = format(
    `INSERT INTO comments (body, votes, author_id, posts_id, created_at) VALUES %L`,
    commentsData.map(({ body, votes = 0, author_id, posts_id, created_at }) => [
      body,
      votes,
      author_id,
      posts_id,
      created_at,
    ])
  );
  await db.query(insertCommentsQueryStr);
}

//sort foregin keys
