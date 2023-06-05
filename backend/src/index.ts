import "dotenv/config"; // Loading .env file

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors(), express.json(), morgan("dev"), helmet());
app.get("/", async (req, res) => {
  return res.json({
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
