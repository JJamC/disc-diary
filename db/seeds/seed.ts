import { db } from "../connection";
import { TestData } from "../test-data";
import format from "pg-format";
import { UserData } from "../test-data/users";
import { AlbumData } from "../test-data/albums";
import { TracksData } from "../test-data/tracks";
import { PostData } from "../test-data/posts";
import { CommentsData } from "../test-data/comments";

export const seed = async (data: TestData) => {
  const { usersData, albumsData, tracksData, postsData, commentsData } = data;

  await db.query(`DROP TABLE IF EXISTS comments`);
  await db.query(`DROP TABLE IF EXISTS posts`);
  await db.query(`DROP TABLE IF EXISTS tracks`);
  await db.query(`DROP TABLE IF EXISTS albums`);
  await db.query(`DROP TABLE IF EXISTS users`);

  await db.query(`CREATE TABLE users ( 
        user_id SERIAL PRIMARY KEY, 
        username VARCHAR NOT NULL,
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
    album_id INT REFERENCES albums(album_id)
)`);
  await db.query(`CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    album_id INT REFERENCES albums(album_id),
    votes INT,
    created_at TIMESTAMP DEFAULT NOW()
);`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
         body VARCHAR NOT NULL,
    votes INT,
    author_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
    );`);

  await insertUsers(usersData);
  await insertAlbums(albumsData);
  await insertTracks(tracksData);
  await insertPosts(postsData);
  await insertComments(commentsData);
};

async function insertUsers(usersData: UserData[]) {
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

async function insertAlbums(albumsData: AlbumData[]) {
  const insertAlbumQueryStr = format(
    `INSERT INTO albums (name, artist, cover_art) VALUES %L`,
    albumsData.map(({ name, artist, cover_art }) => [name, artist, cover_art])
  );
  await db.query(insertAlbumQueryStr);
}

async function insertTracks(tracksData: TracksData[]) {
  const insertTracksQueryStr = format(
    `INSERT INTO tracks (title, album_id) VALUES %L`,
    tracksData.map(({title, album_id }) => [title, album_id])
  );
  await db.query(insertTracksQueryStr);
}

async function insertPosts(postsData: PostData[]) {
  const insertPostsQueryStr = format(
    `INSERT INTO posts (author_id, body, album_id, votes, created_at) VALUES %L`,
    postsData.map(({ author_id, body, album_id, votes = 0, created_at }) => [
      author_id,
      body,
      album_id,
      votes,
      (new Date(created_at).toISOString()),
    ])
  );
  await db.query(insertPostsQueryStr);
}

async function insertComments(commentsData: CommentsData[]) {
  const insertCommentsQueryStr = format(
    `INSERT INTO comments (body, votes, author_id, post_id, created_at) VALUES %L`,
    commentsData.map(({ body, votes = 0, author_id, post_id, created_at }) => [
      body,
      votes,
      author_id,
      post_id,
      (new Date(created_at).toISOString()),
    ])
  );
  await db.query(insertCommentsQueryStr);
}
