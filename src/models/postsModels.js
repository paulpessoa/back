import connectDB from "../config/dbConfig.js";
import { ObjectId } from "mongodb"; // Importe ObjectId

const connection = await connectDB(process.env.DB_URL);

export async function getAllPosts() {
  const db = connection.db("qi-bytes");
  const posts = await db.collection("posts").find().toArray();
  return posts;
  // const collection = db.collection("posts");
  // return collection.find().toArray();
}

export async function getPostById(id) {
  const db = connection.db("qi-bytes");
  try {
    // Verifica se o id é uma string válida de ObjectId
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId format");
    }

    return await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id.toString()) });
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    throw error;
  }
}

export async function createPost(newPost) {
  const db = connection.db("qi-bytes");
  const collection = db.collection("posts");
  return collection.insertOne(newPost);
  // const post = await db.collection("posts").insertOne(newPost);
  // return post.ops[0];
}

export async function updatePost(id, updateContent) {
  const db = connection.db("qi-bytes");
  const collection = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return collection.updateOne(
    { _id: new ObjectId(objID) },
    { $set: updateContent }
  );
}
