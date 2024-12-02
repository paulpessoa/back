import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
} from "../models/postsModels.js";
import fs from "fs";
export async function postsListController(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

export async function getPostByIdController(req, res) {
  try {
    const id = req.params.id;
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(200).json(post);
  } catch (error) {
    if (error.message.includes("Invalid ObjectId")) {
      return res.status(400).json({ message: "ID inválido" });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function createPostController(req, res) {
  const newPost = req.body;
  try {
    const postCreated = await createPost(newPost);
    res.status(201).json(postCreated);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ "Erro: ": "Falha na requisição" });
  }
}

export async function uploadImageController(req, res) {
  try {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    // Cria um novo post com os dados do arquivo
    const newPost = {
      description: req.body.description || "",
      imgUrl: req.file.filename, // Armazena o nome do arquivo
      alt: req.body.alt || "",
    };

    const postCreated = await createPost(newPost);
    const renameImage = `uploads/${postCreated.insertedId}.png`;
    fs.renameSync(req.file.path, renameImage);
    res.status(201).json({
      message: "Upload realizado com sucesso",
      post: postCreated,
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    res.status(500).json({ error: "Falha no upload" });
  }
}
export async function updatePostController(req, res) {
  const id = req.params.id;
  const newImageUrl = `http://localhost:3000/uploads/${id}.png`;
  try {
    // Cria um novo post com os dados do arquivo
    const newPost = {
      imgUrl: newImageUrl, // Armazena o nome do arquivo
      description: req.body.description || "",
      alt: req.body.alt || "",
    };
    const postUpdated = await updatePost(id, newPost);
    res.status(200).json(postUpdated);
  } catch (error) {
    console.error("Erro no upload:", error);
    res.status(500).json({ error: "Falha na atualizacao" });
  }
}
