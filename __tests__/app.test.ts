import { testData } from "../db/test-data";
import request from "supertest"
import { seed } from "../db/seeds/seed";
import { db } from "../db/connection";
import app from "../src/app";

import { UserDto } from "../src/dtos/CreateUser.dto";

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("/api/users", () => {
    test("GET 200: response contains all users", async () => {
        const { body } = await request(app)
            .get("/api/users")
            .expect(200)
        
        const { users } = body;

        expect(users.length).toBe(5)
        users.forEach((user: UserDto) => {
            expect(user).toMatchObject({
                username: expect.any(String),
                email: expect.any(String),
                password: expect.any(String),
                avatar_url: expect.any(String)
            })
        })
    })
    test("POST 201: responds with newly posted user", async () => {
        const newUser = {
            username: "FossoraMushroom",
            email: "fungicity@underground.cave",
            password: "password",
            avatar_url: "placeholder.png"
        }

        const { body } = await request(app)
            .post("/api/users")
            .send(newUser)
            .expect(201)
        
        const { user } = body
        expect(user).toMatchObject({
            user_id: 6,
          username: "FossoraMushroom",
          email: "fungicity@underground.cave",
          password: "password",
          avatar_url: "placeholder.png",
        });
    })
})
describe("/api/users/:user_id", () => {
    test("PATCH 200: responds with updated user", async () => {
      const { body } = await request(app)
        .post("/api/users/1")
        .send({username: "AnchorSinger"})
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
})