import sharp from "sharp";
import { existsSync } from "fs";
import path from "path";

export async function getFilePath(fileName: string): Promise<string> {
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

export const resizer = async (
  imagePath: string,
  filename: string,
  height: number,
  width: number
): Promise<void> => {
  if (!existsSync(`assets/thumb/${filename}_${height}_${width}.jpg`)) {
    await sharp(imagePath)
      .resize(width, height)
      .toFormat("jpg")
      .toFile(`assets/thumb/${filename}_${height}_${width}.jpg`);
  }
};
