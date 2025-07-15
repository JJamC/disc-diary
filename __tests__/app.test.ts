import { testData } from "../db/test-data";
import request from "supertest";
import { seed } from "../db/seeds/seed";
import { db } from "../db/connection";
import app from "../src/app";

import { UserDto } from "../src/dtos/CreateUser.dto";
import { CreateAlbumDto } from "../src/dtos/CreateAlbum.dto";

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("/api/incorrectpath", () => {
  test("GET 404: responds with a 404 message when an invalid endpoint is used", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/invalid").expect(404);
    expect(msg).toBe("Not Found");
  });
});

describe("/api/users", () => {
  test("GET 200: response contains all users", async () => {
    const { body } = await request(app).get("/api/users").expect(200);

    const { users } = body;

    expect(users.length).toBe(5);
    users.forEach((user: UserDto) => {
      expect(user).toMatchObject({
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        avatar_url: expect.any(String),
      });
    });
  });
  test("POST 201: responds with newly posted user", async () => {
    const newUser = {
      username: "FossoraMushroom",
      email: "fungicity@underground.cave",
      password: "password",
      avatar_url: "placeholder.png",
    };

    const { body } = await request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201);

    const { user } = body;
    expect(user).toMatchObject({
      user_id: 6,
      username: "FossoraMushroom",
      email: "fungicity@underground.cave",
      password: "password",
      avatar_url: "placeholder.png",
    });
  });
  test("POST 400: responds with error passage when passed an invalid body", async () => {
    const newUser = {
      email: "fungicity@underground.cave",
      password: "password",
      avatar_url: "placeholder.png",
    };
    const {
      body: { msg },
    } = await request(app).post("/api/users").send(newUser).expect(400);
    expect(msg).toBe("Bad Request");
  });
});

describe("/api/users/:user_id", () => {
  test("GET 200: responds with user object of specified user_id", async () => {
    const { body: { user } } = await request(app).get("/api/users/1").expect(200)
    expect(user).toEqual(
      {
        user_id: 1,
        username: "BacheloretteMode",
        email: "placeholder@placeholder.com",
        password: "password",
        avatar_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Electric_potential_3D_vector_field.svg/640px-Electric_potential_3D_vector_field.svg.png",
      },
    )
  })
  test("GET 400: responds with error msg when passed invalid id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/invalid").expect(400);
    expect(msg).toBe("Bad Request")
  });
  test("GET 404: responds with error msg when non-existent id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/34782").expect(404);
    expect(msg).toBe("Not Found");
  });
  test("PATCH 200: responds with user object with updated username field", async () => {
    const { body } = await request(app)
      .patch("/api/users/1")
      .send({ username: "AnchorSinger" })
      .expect(200);

    const { user } = body;
    expect(user).toMatchObject({
      user_id: 1,
      username: "AnchorSinger",
      email: "placeholder@placeholder.com",
      password: "password",
      avatar_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Electric_potential_3D_vector_field.svg/640px-Electric_potential_3D_vector_field.svg.png",
    });
  });
  test("PATCH 400: returns error given invalid body", async () => {
    const {
      body: { msg },
    } = await request(app).patch("/api/users/1").send({}).expect(400);
    expect(msg).toBe("Bad Request");
  });

  test("PATCH 404: returns error if user does not exist", async () => {
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/users/100")
      .send({ username: "undo7" })
      .expect(404);

    expect(msg).toBe("Not Found");
  });

  test("DELETE 204: deletes specific user", async () => {
    const response = await request(app).delete("/api/users/2").expect(204);
  });
  test("DELETE 400: responds with error message when user_id is invalid", () => {
    return request(app).delete("/api/users/fdsa").expect(400);
  });
  test("DELETE 400: responds with error message when user_id is not found", () => {
    return request(app).delete("/api/users/1213").expect(404);
  });
});

describe("/api/users/:user_id/posts", () => {
  test("GET 200: responds with posts of specified user_id", async () => {
    const {
      body: { postsByUser },
    } = await request(app).get("/api/users/2/posts").expect(200);
    expect(postsByUser.length).toBe(3)
    postsByUser.forEach((post: object) => {
      expect(post).toEqual({
        post_id: expect.any(Number),
        author_id: expect.any(Number),
        body: expect.any(String),
        album_id: expect.any(Number),
        votes: expect.any(Number),
        created_at: expect.any(String),
      });
      })
  });
  test("GET 400: responds with error msg when passed invalid id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/invalid/posts").expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("GET 404: responds with error msg when non-existent id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/34782/posts").expect(404);
    expect(msg).toBe("Not Found");
  });
  test("POST 201: responds with new post made by user", async () => {

    const post = {
      body: "pluto is a planet!",
      album_id: 1,
    };

    const { body } = await request(app)
      .post("/api/users/1/posts")
      .send(post)
      .expect(201)
    
    const { newPost } = body

    expect(newPost).toMatchObject({
      author_id: 1,
      body: "pluto is a planet!",
      album_id: 1,
      votes: 0,
      created_at: expect.any(String),
    });
  })
  test("POST 400: responds with error passage when passed an invalid body", async () => {
    const post = {};
    const {
      body: { msg },
    } = await request(app).post("/api/users/1/posts").send(post).expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("DELETE 204: deletes posts of a specific user", async () => {
    const response = await request(app).delete("/api/users/2/posts").expect(204);
  });
  test("DELETE 400: responds with error message when user_id is invalid", () => {
    return request(app).delete("/api/users/fdsa/posts").expect(400);
  });
  test("DELETE 400: responds with error message when user_id is not found", () => {
    return request(app).delete("/api/users/1213/posts").expect(404);
  });
});

describe("/api/albums", () => {
  test("GET 200: response contains all albums", async () => {
    const {
      body: { albums },
    } = await request(app).get("/api/albums").expect(200);

    expect(albums.length).toBe(4);
    albums.forEach((album: CreateAlbumDto) => {
      expect(album).toMatchObject({
        album_id: expect.any(Number),
        name: expect.any(String),
        artist: expect.any(String),
        cover_art: expect.any(String),
      });
    });
  });
  test("POST 201: posts new album", async () => {
    const newAlbum = {
      name: "Selma's Songs",
      artist: "Bjork",
      cover_art: "placeholder.png",
    };
    const {
      body: { album },
    } = await request(app).post("/api/albums").send(newAlbum).expect(201);

    expect(album).toMatchObject({
      album_id: 5,
      name: "Selma's Songs",
      artist: "Bjork",
      cover_art: "placeholder.png",
    });
  });
  test("POST 400: responds with error passage when passed an invalid body", async () => {
    const newAlbum = {};
    const {
      body: { msg },
    } = await request(app).post("/api/users").send(newAlbum).expect(400);
    expect(msg).toBe("Bad Request");
  });
});

describe("/api/albums/:album_id", () => {
  test("GET 200: responds with album object of specified album_id", async () => {
    const {
      body: { album },
    } = await request(app).get("/api/albums/1").expect(200);
    expect(album).toEqual({
      album_id: 1,
      name: "Homogenic",
      artist: "Bjork",
      cover_art:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bj%C3%B6rkPossiblyMaybeSingle1.jpg/640px-Bj%C3%B6rkPossiblyMaybeSingle1.jpg",
    });
  });
  test("GET 400: responds with error msg when passed invalid id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/albums/invalid").expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("GET 404: responds with error msg when non-existent id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/albums/34782").expect(404);
    expect(msg).toBe("Not Found");
  });
})

describe("/api/albums/:album_id/tracks", () => {
  test("GET 200: responds with all the tracks of a given album_id", async () => {
    const {
      body: { tracks },
    } = await request(app).get("/api/albums/1/tracks").expect(200);
    expect(tracks.length).toBe(3)
    tracks.forEach((track: object) => {
      expect(track).toEqual({
        track_id: expect.any(Number),
        title: expect.any(String),
        album_id: expect.any(Number)
      });
    })
  })
  test("GET 400: responds with error msg when passed invalid id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/albums/invalid/tracks").expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("GET 404: responds with error msg when non-existent id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/albums/34782/tracks").expect(404);
    expect(msg).toBe("Not Found");
  });
}) 

describe("/api/posts", () => {
  test("GET 200: serves responds with array posts", async () => {
      const {
        body: { posts },
      } = await request(app).get("/api/posts").expect(200);

      expect(posts.length).toBe(9);
      posts.forEach((post: object) => {
        expect(post).toMatchObject({
          post_id: expect.any(Number),
          author_id: expect.any(Number),
          body: expect.any(String),
          album_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
        });
    });
  })
})

describe("api/posts/:post_id", () => {
  test("PATCH 200: responds with post object with updated body field", async () => {
    const { body } = await request(app)
      .patch("/api/posts/4")
      .send({ body: "octagon, polygon" })
      .expect(200);
    const { updatedPost } = body;
    expect(updatedPost).toMatchObject({
      post_id: 4,
      author_id: 3,
      body: "octagon, polygon",
      album_id: 4,
      votes: 3,
      created_at: "2025-06-04T14:30:00.000Z",
    });
  });
  test("PATCH 400: returns error given invalid body", async () => {
    const {
      body: { msg },
    } = await request(app).patch("/api/posts/1").send({}).expect(400);
    expect(msg).toBe("Bad Request");
  });
  test("PATCH 404: returns error if post does not exist", async () => {
    const {
      body: { msg },
    } = await request(app)
      .patch("/api/posts/1263478")
      .send({ body: "state of emergency" })
      .expect(404);
    expect(msg).toBe("Not Found");
  });
})