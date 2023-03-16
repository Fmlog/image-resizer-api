import express from "express";
import { resizer, getFilePath } from "./utilities/resize_util";

async function imageProcessor(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const query = req.query;
  const filename = query.filename as string;
  const imagePath = await getFilePath(filename);
  if (query.filename && query.height && query.width) {
    try {
      await resizer(
        imagePath,
        filename,
        Number(query.height),
        Number(query.width)
      );
    } catch (error) {
      throw new Error("Something went wrong \n" + error);
    }
    next();
  } else {
    res.status(400).send("Image query error, please check query");
  }
}

export default imageProcessor;
