import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/api", (req, res) => {
  res.status(200).send({
    message: "Hello World!",
  });
});

app.get("/api/livro", (req, res) => {
  res.status(200).send({
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    ano: 1954,
    genero: "Fantasia",
  });
});
