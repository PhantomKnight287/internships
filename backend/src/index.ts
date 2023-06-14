import "./constants/index.js"; // Making sure env variables are loaded before anything else
import "./db/index.js"; // Instantiating the connection
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PORT } from "./constants/index.js";

export const app: ReturnType<typeof express> = express();
app.use(cors(), express.json(), morgan("dev"), helmet());
app.get("/", async (req, res) => {
  return res.json({
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
