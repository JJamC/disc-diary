const testData = require()
const seed = require("../seeds/seed");
const app = require("../../app");
const endPoints = require("../../endpoints.json");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("/api/topics", () => {
  test("GET 200: response contains all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  })
})