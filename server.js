const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Account = require('./Controllers/AccountController');
const Token = require('./Controllers/Token'); 
const Auth = require('./Middleware/Auth');
const {user} = require('./Routes/routes');
require('dotenv').config();
const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Login & Signup
app.use('/user', user);
user.post('/login', Account.login);
user.post('/signup', Account.register);
user.post('/refreshToken', Token.refreshToken);
user.use(Auth);
user.get('/me', Account.getMe);

//---------------------------------------------------------------------------------------------------
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io")

const socketIo = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});
 

socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
  console.log("New client connected: " + socket.id); 

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  })

});

//---------------------------------------------------------------------------------------------------
server.listen(process.env.PORT || 5000, () => {
  console.log(`server started`);
})