import supertest from "supertest";
import app from "../index";
import { existsSync } from "fs";

const request = supertest(app);

describe("Tests for the endpoint", (): void => {
  describe("GET /", (): void => {
    it("expects to get correct http status response", async (): Promise<void> => {
      const response = await request.get("");
      expect(response.status).toEqual(200);
    });
  });
});

describe("Tests for the resize middleware", (): void => {
  describe("Tests incomplete query", (): void => {
    let response: supertest.Response;
    beforeEach(async (): Promise<void> => {
      response = await request.get("/api/?filename=femi");
    });

    it("GET /api with missing width produces 400 status code", (): void => {
      expect(response.status).toEqual(404);
      expect(response.text).toEqual("Image query error, please check query");
    });

    it("expects image file to be written", async (): Promise<void> => {
      const response = await request.get(
        "/api?filename=femi&width=200&height=200"
      );
      const imgExport = "assets/thumb/femi.jpg";

      expect(response.status).toEqual(200);
      expect(existsSync(imgExport)).toBeTrue();
    });
  });
});

// const request = express.request;
// const response = express.response;

// describe("Server", () => {
//   let server: any;
//   beforeAll(() => {
//     server = require("../index");
//   });
//   afterAll(() => {
//     server.close();
//   });
//   describe('GET /', () => {
//     let data = {}
//     beforeAll(d)
//   })
// });

// describe("Tests for the endpoint", function () {
//   it("expects to get correct http status respones", async () => {
//     try {
//       const response = await request.get("");
//       expect(response.status).toBe(200);
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });

// describe("Tests for the resize middleware", function () {
//   it("expects image file to be written", async (done) => {
//     const query = { filename: "femi", width: "200", height: "200" };
//     resize(query, "", () => {});
//     const imgExport = `assets/thumb/${query.filename}.jpg`;
//     expect(existsSync(imgExport)).toBe(true);
//   });

//   it("expects error to be thrown if file does not exist", (done) => {
//     const response = request.get("");
//     expect(response.text).toBe("Image does not exist");
//     done();
//   });
// });
