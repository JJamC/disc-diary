import {testData} from "../db/test-data";
import { seed } from "../db/seeds/seed";
import { db } from "../db/connection";
import app from "../src/app";

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("test", () => {
    it("test", () => {
        expect(2).toBe(2)
    })
})