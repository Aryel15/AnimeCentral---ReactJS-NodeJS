import { BD_HOST, BD_USER, BD_PASSWORD, BD_NAME, BD_PORT, BD_URL } from "../config";

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: BD_HOST,
    user: BD_USER,
    passsword: BD_PASSWORD,
    database: BD_NAME,
    port: BD_PORT,
    url: BD_URL
});

app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
    db.query("SELECT * FROM animes_list",
    (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result);
        }
    })
})

app.post("/meusanimes", (req, res) => {
    const user = req.body.user;

    db.query("SELECT * FROM animes_list WHERE user = ?", [user] ,
    (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result);
        }
    })
})

app.post("/visualizar", (req, res) => {
    const id = req.body.id;

    db.query("SELECT * FROM animes_list WHERE id = ?", [id] ,
    (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result);
        }
    })
})

app.post("/animes", (req, res) => {
    const titulo = req.body.titulo;

    db.query("SELECT * FROM animes_list WHERE titulo = ?", [titulo] ,
    (err, result) => {
        if(err){
            res.send(err)
        }else{
            res.send(result);
        }
    })
})

app.post("/apagar", (req, res) => {
    const id = req.body.id;

    db.query("DELETE FROM animes_list WHERE id= ? LIMIT 1", [id] ,
    (err, result) => {
        if(err){
            res.send({
                erro: true,
                msg: "Não foi possível excluir este anime!"
            })
        }else{
            res.send({
                erro:false,
                msg:"Anime excluido com successo!"
            });
        }
    })
})

app.post("/adicionar", (req, res) => {
    const titulo = req.body.titulo;
    const status_ = req.body.status_;
    const nota = req.body.nota;
    const user = req.body.user;

    db.query("INSERT INTO animes_list (titulo, status_, nota, user) VALUES (?, ?, ?, ?)", [titulo, status_, nota, user] ,
    (err, result) => {
        if(err){
            res.send({
                erro: true,
                msg: "Anime não adicionado!"
            })
        }else{
            res.send({
                erro:false,
                msg:"Anime adicionado com sucesso!"
            });
        }
    })
})

app.post("/editar", (req, res) => {
    const titulo = req.body.titulo;
    const status_ = req.body.status_;
    const nota = req.body.nota;
    const user = req.body.user;
    const id = req.body.id;

    db.query("UPDATE animes_list SET titulo= ?, status_= ?, nota= ?, user= ? WHERE id=?", [titulo, status_, nota, user, id] ,
    (err, result) => {
        if(err){
            res.send({
                erro: true,
                msg: "Anime não editado!"
            })
        }else{
            res.send({
                erro:false,
                msg:"Anime editado com sucesso!"
            });
        }
    })
})

app.post("/cadastro", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const senha = req.body.senha;

    db.query("SELECT * FROM users WHERE email = ?", [email],
    (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length == 0){
            bcrypt.hash(senha, saltRounds, (err, hash) =>{
                db.query("INSERT INTO users (username, email, senha) VALUES (?, ?, ?)", [username, email, hash], (err, response) =>{
                    if(err){
                        res.send(err);
                    }
                    res.send({
                        erro: false,
                        msg: "Cadastrado com sucesso!"
                    })
                });
            });

        }else{
            res.send({
                erro: true,
                msg: "Usuário já cadastrado"
            })
        }
    })
})

app.post("/login", (req, res) =>{
    const email = req.body.email;
    const senha = req.body.senha;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) =>{
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            bcrypt.compare(senha, result[0].senha, (erro, result) =>{
                if(result){
                    db.query("SELECT username FROM users WHERE email = ?", [email], (erros, resultado) =>{
                        if(erros){
                            res.send(erros);
                        }
                        var username = JSON.parse(JSON.stringify(resultado))[0].username;
                        res.send({
                            username: username,
                            erro: false,
                            msg: "Usuário logado com sucesso!"
                        })

                    })

                }else{
                    res.send({
                        erro: true,
                        msg: "Senha está incorreta"
                    })
                }
            })
        }else{
            res.send({
                erro: true,
                msg: "Conta não encontrada"
            })           
        }
    })
})
const {resolve}= require('path');
app.use('/', express.static( resolve( __dirname, '../client/build' ))) 
app.use('*', express.static( resolve( __dirname, '../client/build' )))
/*app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(__dirname + './client/build/index.html');
});*/

app.listen(process.env.PORT || 3001,(err) => {     
    if(err){
        return console.log(err)
    }      
    console.log('Sistema no ar') 
})
