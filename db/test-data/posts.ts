export type PostData = {
  author_id: number,
  body: string,
  album_id: number,
  votes: number,
  created_at: string
};

export const posts: PostData[] = [
  {
    author_id: 2,
    body: "this album changed my life",
    album_id: 1,
    votes: 3,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
  {
    author_id: 4,
    body: "ethereal and raw at the same time",
    album_id: 2,
    votes: 3,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
  {
    author_id: 5,
    body: "intimate like a whisper",
    album_id: 3,
    votes: 9,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
  {
    author_id: 3,
    body: "like the earth is singing",
    album_id: 4,
    votes: 3,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
  {
    author_id: 1,
    body: "industrial and emotional—how??",
    album_id: 2,
    votes: 0,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
  {
    author_id: 2,
    body: "like breathing in slow motion",
    album_id: 1,
    votes: 3,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
  {
    author_id: 5,
    body: "this album erupted inside me",
    album_id: 1,
    votes: 0,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
  {
    author_id: 4,
    body: "robotic yet full of emotion",
    album_id: 2,
    votes: 7,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
  {
    author_id: 2,
    body: "wild, tribal, untamed",
    album_id: 4,
    votes: 4,
    created_at: '2025-06-04T15:30:00.000Z'
,
  },
];
