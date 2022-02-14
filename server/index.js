import { createServer } from "http";
import { Server } from "socket.io";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users.js";
import { addRoom, removeRoom, getRooms } from "./rooms.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("new connection!!");

  socket.on("newRoom", ({room}) => {
    const roomObj = { id: socket.id, room };
    const { error, rooms } = addRoom(roomObj);
    if (error) return callback(error);
    socket.emit("roomsList", {
      rooms
    });
    callback();
  });

  socket.on("getRooms", () => {
    const rooms = getRooms();
    console.log(rooms)
    socket.emit("roomsList", {
      rooms
    });
  });

  socket.on("join", ({ name, room, avatar }, callback) => {
    const userObj = { id: socket.id, name, room, avatar };
    const { error, user } = addUser(userObj);
    if (error) return callback(error);
    //mensaje para el usuario
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, bienvenido a room ${user.room}`,
    });
    //mensaje para todos los usuarios del canal, meons para el usario que se unió al canal
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, se ha unidoa al chat!` });
    socket.join(user.room);

    //pasando usuarios conectados a una room, para manejar en front
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    //callback del front sin pasar error, porque no hay errores en este punto. en el front esto sin error no genera nada.
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    console.log(message);
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    //en caso de requerir hacer algo despues de enviar el mensaje el front
    callback();
  });

  socket.on("disconnect", () => {
    console.log("user disconnect!!");
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('message', {user:'admin', text: `${user.name} se ha desconectado...`});
      //actualiza el estado de usuarios conectados en el room
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});


httpServer.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});