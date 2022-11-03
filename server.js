const Contenedor = require('./fileManager.js');
const contenedor = new Contenedor();

const express = require('express');
const app = express();

const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log(`server up`)
})

app.get('/productos', (req, resp)=>{
    contenedor.getAll().then(result => resp.send(result));
})

app.get('/productosRandom', (req, resp)=>{
    let idRandom = (Math.floor(Math.random() * 3 + 1 ));
    contenedor.getById(idRandom).then(result => resp.send(result));
})