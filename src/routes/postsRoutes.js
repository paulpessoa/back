import express from "express";
import {
  postsListController,
  getPostByIdController,
  createPostController,
} from "../controllers/postsControllers.js";

const routes = (app) => {
  app.use(express.json());
  app.get("/api/posts", postsListController);
  app.get("/api/posts/:id", getPostByIdController); // Nova rota com parâmetro id
  app.post("/api/posts", createPostController); // Nova rota para criar um post
};

export default routes;
