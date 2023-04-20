const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
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

app.get("/home", (req, res) => {
    db.collection("AnimeCentral").find({}).toArray((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
            console.log(result)
        }
    });
});

app.post("/meusanimes", (req, res) => {
    const user = req.body.user;
  
    db.collection("AnimeCentral").find({ user: user }).toArray((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});


app.post("/visualizar", (req, res) => {
    const id = req.body.id;

    db.collection("AnimeCentral").findOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/animes", (req, res) => {
    const titulo = req.body.titulo;

    db.collection("AnimeCentral").find({ titulo: titulo }).toArray((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post("/apagar", (req, res) => {
    const id = req.body.id;

    db.collection("AnimeCentral").deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) {
            res.send({
                erro: true,
                msg: "Não foi possível excluir este anime!"
            });
        } else {
            res.send({
                erro: false,
                msg: "Anime excluído com sucesso!"
            });
        }
    });
});

app.post("/adicionar", (req, res) => {
    const titulo = req.body.titulo;
    const status_ = req.body.status_;
    const nota = req.body.nota;
    const user = req.body.user;

    db.collection("AnimeCentral").insertOne({ titulo: titulo, status_: status_, nota: nota, user: user }, (err, result) => {
        if (err) {
            res.send({
                erro: true,
                msg: "Anime não adicionado!"
            });
        } else {
            res.send({
                erro: false,
                msg: "Anime adicionado com sucesso!"
            });
        }
    });
});

app.post("/editar", (req, res) => {
    const titulo = req.body.titulo;
    const status_ = req.body.status_;
    const nota = req.body.nota;
    const user = req.body.user;
    const id = req.body.id;

    db.collection("AnimeCentral").updateOne({ _id: ObjectId(id) }, { $set: { titulo: titulo, status_: status_, nota: nota, user: user } }, (err, result) => {
        if (err) {
            res.send({
                erro: true,
                msg: "Anime não editado!"
            });
        } else {
            res.send({
                erro: false,
                msg: "Anime editado com sucesso!"
            });
        }
    });
});


app.post("/cadastro", (req, res) => {
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
          }
        });
      } else {
        res.send({
          erro: true,
          msg: "Usuário já cadastrado"
        });
        console.error()
      }
    });
});
  
app.post("/login", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
  
    db.collection("AnimeCentral").findOne({ email: email }, (err, result) => {
      if (err) {
        res.send(err);
      } else if (!result) {
        res.send({
          erro: true,
          msg: "Conta não encontrada"
        });
      } else {
        bcrypt.compare(senha, result.senha, (err, result) => {
          if (err) {
            res.send(err);
          } else if (result) {
            db.collection("AnimeCentral").findOne({ email: email }, { projection: { username: 1, _id: 0 } }, (err, result) => {
              if (err) {
                res.send(err);
              } else {
                res.send({
                  username: result.username,
                  erro: false,
                  msg: "Usuário logado com sucesso!"
                });
              }
            });
          } else {
            res.send({
              erro: true,
              msg: "Senha está incorreta"
            });
          }
        });
      }
    });
});
    }
    client.close();
});

app.listen(3001, err => err ? console.log(err) : console.log('Sistema no ar'));
