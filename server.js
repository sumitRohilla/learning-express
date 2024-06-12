import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import pageNotFound from "./middleware/notFound.js";
import connectDB from "./db/connections.js";

const port = process.env.PORT || 8000;

const app = express();

// static pages
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// body paser middleware
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
