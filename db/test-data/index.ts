import { albums as albumsData } from "./albums";
import { comments as commentsData } from "./comments";
import { posts as postsData } from "./posts";
import { tracks as tracksData } from "./tracks";
import { users as usersData } from "./users";
import { AlbumData } from "./albums";
import { CommentsData } from "./comments";
import { PostData } from "./posts";
import { TracksData } from "./tracks";
import { UserData } from "./users";

export type TestData = {
  albumsData: AlbumData[];
  commentsData: CommentsData[];
  postsData: PostData[];
  tracksData: TracksData[];
  usersData: UserData[];
};

export const testData: TestData = {
  albumsData,
  commentsData,
  postsData,
  tracksData,
  usersData,
};
