import express from "express";
import image from "./api/index";

const app = express();
const PORT = 3000;

app.use("/", image);

app.get("", (req, res) => {
  res.status(200).send("Image resizer");
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

export default app;
