import dotenv from 'dotenv'
import express from 'express'
import routes from './Routes/index.js'
import connectBD from './Config/database.js';
dotenv.config();

const connection = await connectBD();

connection.on("error", (erro) => {
    console.error(`Falha ao conectar com o banco de dados: ${erro}`)
});

connection.once("open", () => {
    console.log("A conexão foi feita com sucesso!")
});

const app = express()
const port = 3000;

routes(app);

app.listen(port, () => console.log("Servidor online em http://localhost:3000/"))