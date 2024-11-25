import { getAllPosts, getPostById, createPost } from "../models/postsModels.js";

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
    res.status(400).json({ message: error.message });
  }
}
