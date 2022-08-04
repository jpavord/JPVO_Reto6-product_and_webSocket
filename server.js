const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const chat = require('./src/chat.js')

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const fs = require('fs');
/////////////////////////////////////
//      EJS
/////////////////////////////////////
const ejs = require('ejs')
//app.set("views", "public");
app.set("view engine", "ejs");

const fecha = new Date();
const hoy = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
const hora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`

let productos = [
    {title: "Yoyo", price: "$34.5", thumbnail: "https://cdn4.iconfinder.com/data/icons/dia-de-muerdos/512/dia_de_muertos-35-128.png"},
    {title: "Trompo", price: "$45.7", thumbnail: "https://cdn4.iconfinder.com/data/icons/mexican-icons-2/206/Trompo-128.png"},
    {title: "Pelota", price: "$300.2", thumbnail: "https://cdn2.iconfinder.com/data/icons/funtime-objects-part-1/60/005_001_ball_toy_game_play-128.png"}
]

let messages = [
    {author: "Juan@correo.com", text: "¡Hola! ¿Que tal?"},
    {author: "Pedro@correo.com", text: "¡Muy bien! ¿Y tu?"},
    {author: "Ana@correo.com", text: "¡Genial!"}
]



app.get('/', (req, res)=>{
    //res.sendFile('index.html', {root: __dirname, productos: productos});
    res.render('pages/index', {productos: productos, messages: messages, hoy: hoy, hora: hora});
});

io.on('connection', socket=>{
    console.log("cliente nuevo conectado!");
    socket.emit('productos', productos);
    socket.emit('messages', messages);


socket.on('nuevo-producto', data =>{
    productos.push({...data})
    io.sockets.emit('productos', productos);
})

socket.on('new-message', data=>{
    messages.push(data);
    console.log(messages)
    io.sockets.emit('messages', messages)
}) 
})


httpServer.listen(8080, ()=>{
    console.log("Servidor corriendo por el puerto 8080")
})