import express from "express";
import path from "path";
import resize from "./resize";

const image = express.Router();

image.get("/api", resize, (req, res) => {
  const query = req.query;
  const imgExport = `assets/thumb/${query.filename}.jpg`;
  try {
    res.status(200).sendFile(path.resolve(imgExport));
  } catch (error) {
    res.status(404).send("Image query error, please check query");
  }
});

export default image;
