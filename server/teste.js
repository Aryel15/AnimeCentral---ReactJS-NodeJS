const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.url;
const dbName = "AnimeCentral";

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log('Erro ao conectar com o MongoDB:', err);
    } else {
      console.log('Conexão estabelecida com sucesso!');
      const db = client.db(dbName);

app.post("/cadastro", (req, res) => {
    console.log("Rota /cadastro acessada");
    res.send("Rota /cadastro acessada");
    const username = req.body.username;
    const email = req.body.email;
    const senha = req.body.senha;
  
    db.collection("AnimeCentral").findOne({ email: email }, (err, result) => {
      if (err) {
        res.send(err);
      } else if (!result) {
        bcrypt.hash(senha, saltRounds, (err, hash) => {
          if (err) {
            res.send(err);
          } else {
            db.collection("AnimeCentral").insertOne({ username: username, email: email, senha: hash }, (err, response) => {
              if (err) {
                res.send(err);
              } else {
                res.send({
                  erro: false,
                  msg: "Cadastrado com sucesso!"
                });
              }
            });
            client.close();
          }
        });
      } else {
        res.send({
          erro: true,
          msg: "Usuário já cadastrado"
        });
        //console.error()
      }
    });
    
});
}
});

app.listen(3001, () => console.log("Servidor iniciado na porta 3001"));