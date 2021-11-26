const app = require("../app");
const request = require("supertest");
const { userOne, setUpDatabase } = require("./fixtures/db");
const jwt = require("jsonwebtoken");

beforeAll(setUpDatabase);

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/auth/admin")
    .send({
      name: "Test User",
      email: "test@user.com",
      password: "testing101",
      name: "New Singer",
    })
    .expect(201);

  const user = jwt.verify(response.text, "sendme:coded")?.user;
  expect(user).not.toBeNull();
});

test("Should not sign up a new user with incomplete data", async () => {
  await request(app)
    .post("/auth/admin")
    .send({
      email: "test@user.com",
      password: "testing101",
      name: "New Singer",
    })
    .expect(400);

  //Assertion about the response
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/auth/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = jwt.verify(response.text, "sendme:coded")?.user;
  expect(user).not.toBeNull();
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/auth/login")
    .send({
      email: "newuser@test.com",
      password: "newuser!!!",
    })
    .expect(404);
});
