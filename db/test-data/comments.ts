export type CommentsData = {
  body: string,
  votes: number,
  author_id: number,
  post_id: number,
  created_at: number
};

export const comments: CommentsData[] = [
  {
    body: "I agree I love this album too",
    votes: 16,
    author_id: 3,
    post_id: 2,
    created_at: 1586899140000,
  },
  {
    body: "This track literally gives me chills every time.",
    votes: 22,
    author_id: 1,
    post_id: 7,
    created_at: 1609459200000,
  },
  {
    body: "Honestly, one of her most underrated works.",
    votes: 14,
    author_id: 1,
    post_id: 6,
    created_at: 1622505600000,
  },
  {
    body: "I looped this album for days after my first listen.",
    votes: 30,
    author_id: 2,
    post_id: 5,
    created_at: 1638316800000,
  },
  {
    body: "No one blends nature and technology like Björk.",
    votes: 18,
    author_id: 3,
    post_id: 3,
    created_at: 1651363200000,
  },
  {
    body: "That breakdown at the end? Legendary.",
    votes: 11,
    author_id: 3,
    post_id: 2,
    created_at: 1661990400000,
  },
  {
    body: "This song feels like falling into a dream.",
    votes: 25,
    author_id: 4,
    post_id: 2,
    created_at: 1661990400000,
  },
  {
    body: "Best use of strings in her entire discography IMO.",
    votes: 20,
    author_id: 4,
    post_id: 2,
    created_at: 1672531200000,
  },
  {
    body: "This video made me cry and I don’t even know why.",
    votes: 17,
    author_id: 5,
    post_id: 1,
    created_at: 1688169600000,
  },
  {
    body: "Everything about this era was iconic.",
    votes: 27,
    author_id: 5,
    post_id: 5,
    created_at: 1704067200000,
  },
];
