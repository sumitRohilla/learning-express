import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./src/routes/posts.js";
import logger from "./src/middlewares/logger.js";
import errorHandler from "./src/middlewares/error.js";
import pageNotFound from "./src/middlewares/notFound.js";

const port = process.env.PORT || "";

const app = express();

let corsOrigins = {
  origin: ["http://localhost:8000", "https://learning-expressjs.vercel.app/"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOrigins));

// static pages
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(logger);

app.use("/api/posts", posts);

// error handling
app.use(pageNotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on PORT : ${port}`);
});
