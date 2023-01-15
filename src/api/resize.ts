import path from "path";
import sharp from "sharp";
import express from "express";
import { existsSync } from "fs";

function getFilePath(fileName: string): string {
  const exts = [".png", ".jpg", ".webp"];
  let fullFilename = "";
  const matches = [];
  for (const e of exts) {
    matches.push(path.resolve("assets/full/" + fileName + e));
  }
  for (const m of matches) {
    if (existsSync(m)) {
      fullFilename = m;
      break;
    }
  }
  return fullFilename;
}

async function resize(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log(req.query);
  const query = req.query;
  const filename = query.filename as string;
  const image = getFilePath(filename);
  const height = Number(query.height);
  const width = Number(query.width);

  try {
    if (!existsSync(`assets/thumb/${filename}.jpg`)) {
      await sharp(image)
        .resize(width, height)
        .toFormat("jpg")
        .toFile(`assets/thumb/${filename}.jpg`);
    }
  } catch (error) {
    console.log(error);
  }
  next();
}

export default resize;
