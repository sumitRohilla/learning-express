import { Router } from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = Router();

// get all posts
router.get("/", getPosts);

//get single post
router.get("/:id", getPost);

// create new Post
router.post("/", createPost);

// update no params passed
router.put("/", (req, res, next) => {
  const err = new Error("ID not Passed!!");
  err.status = 404;
  return next(err);
});

// update post
router.put("/:id", updatePost);

// delete no params passed
router.delete("/", (req, res, next) => {
  const err = new Error("ID not Passed!!");
  err.status = 404;
  return next(err);
});

//delete post
router.delete("/:id", deletePost);

export default router;
