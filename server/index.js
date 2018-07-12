const express = require('express')
const app = express();

//my assumption is 
const server  = require("http").createServer(app)
const io = require("socket.io")(server)
const bodyParser = require('body-parser')
const sharedsession = require("express-socket.io-session");
app.use(bodyParser.json())

//set id for user
let id = 0;
//set id for each message
let messageID = 0;

// we will need to use this session instance in multiple areas so we set it to a variable so it can be used later
const session = require("express-session")({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false
  })

// use session with express
app.use(session);
 
// use session with socketio
io.use(sharedsession(session));

app.post('/login', (req, res) => {
    const { username } = req.body;
    req.session.user = {
        id: id,
        username: username
    };

    id++
    res.json(req.session.user);
});


app.get('/api/user', (req, res) => {
    console.log('hit')
    res.status(200).json(req.session.user)
})

app.post('/api/user', (req, res) => {
    if(req.session.user){
    req.session.user.test = req.body.test;
    res.status(200).json(req.session.user)
    }
})

// Share session with io sockets
app.post('/api/logout', (req, res) => {
    req.session.destroy()
    res.end();
})


io.sockets.on("connection", (socket) => {

    console.log('connected')
    //this event is hit when componentDidMount Runs connecting the user
    socket.on('room_connection', connectionObj => {
        socket.handshake.session.user = connectionObj.user;
        // socket.handshake.session.save();
        socket.join(connectionObj.room)
    })
    //event that run when messages are sent
    socket.on("message", (messageObj) => {
        //check to see if there is a message 
        if(messageObj && socket.handshake.session.user){
        io.in(messageObj.room).emit('message', {user: socket.handshake.session.user,  message: messageObj.message, id:  messageID}); 
        messageID++  
        }
    });

    socket.on('disconnect', () => {
       console.log('user disconnected')
       socket.leave('chatroom')
    })  

});
 
server.listen(4000);
console.log('listening on port 4000')