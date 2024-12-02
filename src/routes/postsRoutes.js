import express from "express";
import multer from "multer";
import {
  postsListController,
  getPostByIdController,
  createPostController,
  uploadImageController,
  updatePostController
} from "../controllers/postsControllers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Caminho onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Garante que o nome do arquivo seja único
  },
});

const upload = multer({ storage: storage });

const routes = (app) => {
  app.use(express.json());
  app.get("/api/posts", postsListController);
  app.get("/api/posts/:id", getPostByIdController); // Nova rota com parâmetro id
  app.post("/api/posts", createPostController); // Nova rota para criar um post
  app.post("/api/upload", upload.single("image"), uploadImageController); // Rota para upload de imagem
  app.put("/api/upload/:id", updatePostController); // Rota para atualizar post
};

export default routes;
