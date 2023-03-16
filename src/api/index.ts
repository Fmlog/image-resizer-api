import express from "express";
import path from "path";
import imageProcessor from "./image_processor";

const image = express.Router();

image.get(
  "/api/image",
  imageProcessor,
  (req: express.Request, res: express.Response) => {
    const query = req.query;
    const imgExport = `assets/thumb/${query.filename}_${query.height}_${query.width}.jpg`;
    
    try {
      res.status(200).sendFile(path.resolve(imgExport));
    } catch (error) {
      res.send(`Something went wrong ${error}`);
    }
  }
);

export default image;
