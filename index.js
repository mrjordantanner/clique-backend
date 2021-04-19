const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');
const indexRoute = require("./routes/route");

app.use(indexRoute);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersController = require('./controllers/users');
app.use('/users', usersController);



const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
    //   origin: '*',
      origin: "http://localhost:3000",
    }
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  
  interval = setInterval(() => getApiAndEmit(socket), 50);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};


const port = process.env.PORT || 4001;

// app.listen(port, () => {
// 	console.log(`app is listening on port ${port}`);
// });

server.listen(port, () => console.log(`Listening on port ${port}`));