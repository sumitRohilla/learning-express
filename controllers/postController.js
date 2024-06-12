// let posts = [
//   { id: 1, title: "post one" },
//   { id: 2, title: "post two" },
//   { id: 3, title: "post three" },
// ];

import { ConnectionReadyEvent } from "mongodb";
import db from "../db/connections.js";

// @desc Get all post
// @route GET /api/posts

const getPosts = async (req, res, next) => {
  let limit = parseInt(req.query._limit);

  let conn = db.collection("posts");

  if (!isNaN(limit) && limit >= 0) {
    let data = await conn.find({}).limit(limit).toArray();
    return res.json(data);
  }
  res.json(await conn.find({}).toArray());
};

// @desc Get single post
// @route GET /api/posts/:id

const getPost = async (req, res, next) => {
  let id = parseInt(req.params.id);
  let connection = db.collection("posts");

  if (isNaN(id)) {
    const err = new Error("Incorrect ID passed!");
    err.status = 400;
    return next(err);
  }
  // const post = posts.find((post) => post.id === id);
  const post = await connection.findOne({ id: id });

  if (!post) {
    const err = new Error(`Post with ID: ${id} not found!!`);
    err.status = 404;
    return next(err);
  }
  res.json(post);
};

// @desc Create post
// @route POST /api/posts

const createPost = async (req, res, next) => {
  if (req.body.title === undefined || req.body.title === "") {
    const err = new Error("Please provide title!!");
    err.status = 400;
    return next(err);
  }
  let connection = db.collection("posts");

  const newPost = {
    id: (await connection.countDocuments()) + 1,
    title: req.body.title,
  };

  await connection.insertOne(newPost);
  let response = await connection.find({}).toArray();
  // posts.push(newPost);

  res.json(response);
};

// @desc update post
// @route PUT /api/posts/:id

const updatePost = async (req, res, next) => {
  let id = parseInt(req.params.id);
  let connection = db.collection("posts");

  if (isNaN(id)) {
    const err = new Error("Incorrect ID passed!!");
    err.status = 404;
    return next(err);
  }
  // const post = posts.find((post) => post.id === id);
  let post = await connection.findOne({ id: id });

  if (!post) {
    const err = new Error(`Post with ID: ${id} not found!!`);
    err.status = 404;
    return next(err);
  } else if (req.body.title === "" || req.body.title === undefined) {
    const err = new Error("Please provide title!!");
    err.status = 400;
    return next(err);
  }
  // post.title = req.body.title;
  await connection.updateOne({ id: id }, { $set: { title: req.body.title } });

  res.json(await connection.find({}).toArray());
};

// @desc delete post
// @route DELETE /api/posts/:id

const deletePost = async (req, res, next) => {
  let id = parseInt(req.params.id);
  let connection = db.collection("posts");

  if (isNaN(id)) {
    const err = new Error("Incorrect ID passed!!");
    err.status = 400;
    return next(err);
  }
  // const post = posts.find((post) => post.id === id);
  const post = await connection.deleteOne({ id: id });

  console.log(post);

  if (!post.deletedCount) {
    const err = new Error(`Post with ID: ${id} not found!!`);
    err.status = 404;
    return next(err);
  }
  // posts = posts.filter((post) => post.id != id);
  // await connection.deleteOne({ id: id });

  res.json(await connection.find({}).toArray());
};

export { getPosts, getPost, updatePost, createPost, deletePost };
