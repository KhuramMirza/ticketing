import request from "supertest";
import { app } from "../../app.js";

it("fails when a email that does not exist us supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "sdadadassdasas@gmail.com",
      password: "test1234",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test1@gamil.com",
      password: "test1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test1@gmail.com",
      password: "test12345",
    })
    .expect(400);
});

it("logs the user in when correct email and password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test1@gmail.com",
      password: "test1234",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test1@gmail.com",
      password: "test1234",
    })
    .expect(200);
});
