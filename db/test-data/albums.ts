export type AlbumData = {
  name: string,
  artist: string,
  cover_art: string
}

export const albums: AlbumData[] = [
  {
    name: "Homogenic",
    artist: "Bjork",
    cover_art:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bj%C3%B6rkPossiblyMaybeSingle1.jpg/640px-Bj%C3%B6rkPossiblyMaybeSingle1.jpg",
  },
  {
    name: "Post",
    artist: "Bjork",
    cover_art: "https://upload.wikimedia.org/wikipedia/en/e/e2/BjorkPost.png",
  },
  {
    name: "Vespertine",
    artist: "Bjork",
    cover_art:
      "https://upload.wikimedia.org/wikipedia/en/e/e7/BjorkVespertine.png",
  },
  {
    name: "Biophilia",
    artist: "Bjork",
    cover_art:
      "https://upload.wikimedia.org/wikipedia/en/4/49/Bj%C3%B6rk_-_Biophilia.png",
  }
];
