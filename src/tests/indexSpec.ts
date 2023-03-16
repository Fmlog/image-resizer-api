import supertest from "supertest";
import app from "../index";
import { existsSync, unlinkSync } from "fs";
import { resizer, getFilePath } from "../api/utilities/resize_util";

const request = supertest(app);
describe("Tests for the middleware only", (): void => {
  describe("Tests for the resizer function", (): void => {
    it("expects the resize function to work", async (): Promise<void> => {
      const imagePath = "assets/full/femi.jpg";
      const resizedImg = "assets/thumb/femi_250_250.jpg";
      if (existsSync(resizedImg)) {
        unlinkSync(resizedImg);
      }
      await resizer(imagePath, "femi", 250, 250);
      expect(existsSync(resizedImg)).toBeTrue();
      unlinkSync(resizedImg);
    });
  });
});
describe("Tests for the getFilePath function", (): void => {
  it("expects getFilePath to return full path", async (): Promise<void> => {
    const fullPath = await getFilePath("femi");
    expect(existsSync(fullPath)).toBeTrue();
  });
});

describe("Tests for the endpoints", (): void => {
  describe("Tests GET /", (): void => {
    it("expects to get correct http status response", async (): Promise<void> => {
      const response = await request.get("");
      expect(response.status).toEqual(200);
    });
  });
});

describe("Tests GET /api/image", (): void => {
  let response: supertest.Response;

  it("expects image file to be written", async (): Promise<void> => {
    const response = await request.get(
      "/api/image?filename=femi&width=200&height=200"
    );
    const imgExport = "assets/thumb/femi_200_200.jpg";

    expect(response.status).toEqual(200);
    expect(existsSync(imgExport)).toBeTrue();
  });
  it("expects query with missing params return 400 status code and 'wrong query' error ", async (): Promise<void> => {
    response = await request.get("/api/image?filename=femi");
    expect(response.status).toEqual(400);
    expect(response.text).toEqual("Image query error, please check query");
  });
});
