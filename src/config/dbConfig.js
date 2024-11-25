import { MongoClient } from "mongodb";

export default async function connectDB(stringConection) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConection);
    console.log("conectando ao cluster de banco de dados");
    await mongoClient.connect();
    console.log("Conectado ao AtlasDB com sucesso");
    return mongoClient;
  } catch (error) {
    console.error("erro ao conectar ao cluster de banco de dados", error);
    process.exit();
  }
}
