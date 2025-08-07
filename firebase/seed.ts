import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";
import { testData, TestData } from "../db/test-data";
import { UserData } from "../db/test-data/users";
import { AlbumData } from "../db/test-data/albums";
import { TracksData } from "../db/test-data/tracks";
import { PostData } from "../db/test-data/posts";
import { CommentsData } from "../db/test-data/comments";


dotenv.config({ path: path.resolve(__dirname, `../.env.development`) });

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export const seed = async ({
  usersData,
  albumsData,
  tracksData,
  postsData,
  commentsData,
}: TestData) => {

  await clearCollection("users");
  await clearCollection("albums");
  await clearCollection("tracks");
  await clearCollection("posts");
  await clearCollection("comments");

  await insertUsers(usersData);
  await insertAlbums(albumsData);
  await insertTracks(tracksData);
  await insertPosts(postsData);
  await insertComments(commentsData);
};

async function clearCollection(collectionName: string) {
  const snapshot = await db.collection(collectionName).get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

async function insertUsers(users: UserData[]) {
    users.forEach(async (user) => await db.collection("users").add(user));
}

async function insertAlbums(albums: AlbumData[]) {
    albums.forEach(async (album) => await db.collection("albums").add(album));

}

async function insertTracks(tracks: TracksData[]) {
    tracks.forEach(async (track) => await db.collection("tracks").add(track));

}

async function insertPosts(posts: PostData[]) {
  posts.forEach(
    async (post) =>
      await db.collection("posts").add({
        ...post,
        created_at: new Date(post.created_at),
        votes: post.votes || 0,
      })
  );  
}

async function insertComments(comments: CommentsData[]) {
    comments.forEach(
      async (comment) =>
        await db.collection("comments").add({
          ...comments,
          created_at: new Date(comment.created_at),
          votes: comment.votes || 0,
        })
    );  
}

seed(testData).catch((e) => {
  console.error(e);
});
  
