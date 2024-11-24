import express from "express";

const posts = [
  {
    id: 1,
    description: "This is a post about Node.js",
    image: "https://placecats.com/millie/300/149",
  },
  {
    id: 2,
    description: "This is a post about Express.js",
    image: "https://placecats.com/millie/300/158",
  },
  {
    id: 3,
    description: "This is a post about React.js",
    image: "https://placecats.com/millie/300/151",
  },
  {
    id: 4,
    description: "This is a post about MongoDB",
    image: "https://placecats.com/millie/300/152",
  },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/api", (req, res) => {
  res.status(200).send({
    message: "Hello World!",
  });
});
app.get("/api/posts", (req, res) => {
  res.status(200).json(posts);
});

function searchPortById(id) {
  return posts.findIndex((post) => post.id === Number(id));
}
app.get("/api/posts/:id", (req, res) => {
  const id = searchPortById(req.params.id);
  res.status(200).json(posts[id]);
});

app.get("/api/livro", (req, res) => {
  res.status(200).send({
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    ano: 1954,
    genero: "Fantasia",
  });
});
