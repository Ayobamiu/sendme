const app = require("../app");
const request = require("supertest");
const { setUpDatabase } = require("./fixtures/db");

beforeAll(setUpDatabase);

test("Add a new stock with complete data", async () => {
  const response = await request(app)
    .post("/stock/")
    .send({
      title: "Test title",
      amount: 100,
      description: "testing description",
    })
    .expect(201);

  expect(response.text).not.toBeNull();
});

test("Don't add a new stock with incomplete data", async () => {
  await request(app)
    .post("/stock/")
    .send({
      amount: 100,
      description: "testing description",
    })
    .expect(400);
});
