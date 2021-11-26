const express = require("express");
const { Server } = require("socket.io");
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});

//El dirname va a la raíz donde está corriendo tu proyecto
app.use(express.static(__dirname + "/public"));
const io = new Server(server);
let messages = [];

//On respuesta y emit => envío
io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.emit("messagelog", messages);
  socket.emit("welcome", "BIENVENIDO A MI SOCKET");
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messagelog", messages);
  });
});
//io.emit => envía el mensaje a todos al mismo tiempo
