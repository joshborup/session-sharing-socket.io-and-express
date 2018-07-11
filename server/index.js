const express = require('express')
const app = express();
const server  = require("http").createServer(app)
const io = require("socket.io")(server)
const bodyParser = require('body-parser')
app.use(bodyParser.json())


let id = 0;
const session = require("express-session")({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false
  })
const sharedsession = require("express-socket.io-session");
 
 
// Attach session
app.use(session);
 


app.post('/login', (req, res) => {
    const { username } = req.body;
    req.session.user = {
        id: id,
        username: username
    };

    id++
    console.log(req.session.user)
    res.json(req.session.user);
});

app.post('/api/logout', (req, res) => {
    req.session.destroy()
    res.end();
})

app.get('/api/user', (req, res) => {
    res.status(200).json({user: req.session.user})
})
// Share session with io sockets
 
io.use(sharedsession(session));
 
io.on("connection", (socket) => {

    socket.on("message", (message) => {
        if(message && socket.handshake.session.user){
        socket.handshake.session
        socket.handshake.session.save();
        io.emit('message', {username: socket.handshake.session.user.username,  message: message});   
        }     
    });        
});
 
server.listen(4000);
console.log('listening on port 4000')