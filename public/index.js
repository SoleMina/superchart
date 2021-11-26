const socket = io();

let input = document.querySelector("#mensaje");
let user = document.querySelector("#user");

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (e.target.value) {
      socket.emit("message", { user: user.value, message: e.target.value });
    }
  }
});

//On recibe
socket.on("welcome", (data) => {
  alert(data);
});
socket.on("messagelog", (data) => {
  let p = document.querySelector("#log");
  let mensajes = data
    .map((message) => {
      return `<div><span>${message.user} dice: ${message.message}</span></div>`;
    })
    .join("");
  p.innerHTML = mensajes;
  //  p.innerHTML = `${data[0].user} dice: ${data[0].message}`;
  //console.log(data);
});
