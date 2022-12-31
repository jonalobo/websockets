const express = require("express");
require('dotenv').config()
const cors = require('cors')

const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
//Express.json es fundamental para leer el contenido en el body de la request
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT

const hbs = require("hbs");
const { ruta } = require("./routes/rutaIngresar");

app.set("view engine", "hbs");

app.set("views", (__dirname, "views"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

app.use(express.static("public"));

app.use("/", ruta);
const date = new Date()

const messages = [{
  author:"Jonathan@hotmail.com",
  date: date,
  text:"Hola como están"
}]

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('messages', messages)
    socket.on('new-message', data=>{
      messages.push(data)
      io.sockets.emit('messages', messages)
    })
  });

server.listen(PORT, () => {
  console.log(`servidor en linea en el puerto ${PORT}`);
});
