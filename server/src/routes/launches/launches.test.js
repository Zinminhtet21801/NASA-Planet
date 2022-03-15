const app = require("../../app");
const request = require("supertest");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  describe("Test GET /launches", () => {
    test("It should response with 200 success", async () => {
      await request(app).get("/planets").expect(200);
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "ZEKE111",
      rocket: "ZEKE EIS IS1",
      destination: "Kepler-62 f",
      launchDate: "January 17, 2030",
    };

    const launchDataWithoutDate = {
      mission: "ZEKE111",
      rocket: "ZEKE EIS IS1",
      destination: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "ZEKE111",
      rocket: "ZEKE EIS IS1",
      destination: "Kepler-62 f",
      launchDate: "zooties",
    };

    test("It should response with 200 success", async () => {
      await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    test("Post launches should response with 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("Post launches should response with 400 bad request", async () => {
      await request(app)
        .post("/launches")
        .send({
          mission: "ZEKE111",
          rocket: "ZEKE EIS IS1",
          destination: "Kepler-186 f",
        })
        .expect("Content-Type", /json/)
        .expect(400);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "launchDate is required.",
      });
    });
    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "launchDate is required.",
      });
    });
  });
});
