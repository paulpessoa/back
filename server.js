import express from "express";
import connectDB from "./src/config/dbConfig.js";

const connection = await connectDB(process.env.DB_URL);
// const posts = [
//   {
//     id: 1,
//     description: "This is a post about Node.js",
//     image: "https://placecats.com/neo/300/149",
//     favorite: true,
//   },
//   {
//     id: 2,
//     description: "This is a post about Express.js",
//     image: "https://placecats.com/bella/300/158",
//     favorite: false,
//   },
//   {
//     id: 3,
//     description: "This is a post about React.js",
//     image: "https://placecats.com/millie/300/150",
//     favorite: false,
//   },
//   {
//     id: 4,
//     description: "This is a post about MongoDB",
//     image: "https://placecats.com/millie/neo_banana/150",
//     favorite: true,
//   },
// ];

async function getAllPosts() {
  const db = connection.db("qi-bytes");
  const posts = db.collection("posts");
  return posts.find().toArray();
}
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.get("/api/posts", async (req, res) => {
  const posts = await getAllPosts();
  res.status(200).json(posts);
});


// app.get("/api", (req, res) => {
//   res.status(200).send({
//     message: "Hello World!",
//   });
// });
// app.get("/api/posts", (req, res) => {
//   res.status(200).json(posts);
// });

// function searchPortById(id) {
//   return posts.findIndex((post) => post.id === Number(id));
// }
// // app.get("/api/posts/:id", (req, res) => {
// //   const id = searchPortById(req.params.id);
// //   res.status(200).json(posts[id]);
// // });

// app.post("/api/posts/", (req, res) => {
//   favoritePost(req.body);
//   res.status(201).send({
//     message: "Post created",
//   });
// });

// function favoritePost(post) {
//   if (!post.description || !post.image) {
//     return false;
//   }
//   post.id = posts.length + 1;
//   post.favorite = post.favorite || false;
//   posts.push(post);
//   return true;
// }

// app.get("/api/posts/favorites", (req, res) => {
//   const favoritePosts = posts.filter((post) => post.favorite);
//   res.status(200).json(favoritePosts);
// });

// app.get("/api/posts/:id", (req, res) => {
//   const id = searchPortById(req.params.id);
//   if (id >= 0) {
//     res.status(200).json(posts[id]);
//   } else {
//     res.status(404).send({
//       message: "Post not found",
//     });
//   }
// });

// app.put("/api/posts/:id/favorite", (req, res) => {
//   const id = searchPortById(req.params.id);
//   if (id >= 0) {
//     posts[id].favorite = !posts[id].favorite;
//     res.status(200).json(posts[id]);
//   } else {
//     res.status(404).send({
//       message: "Post not found",
//     });
//   }
// });

// app.get("/api/livro", (req, res) => {
//   res.status(200).send({
//     titulo: "O Senhor dos Anéis",
//     autor: "J.R.R. Tolkien",
//     ano: 1954,
//     genero: "Fantasia",
//   });
// });
