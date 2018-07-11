const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const userSession = require('express-session');

 const session = userSession({
            secret: 'g',
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 14 * 24 * 1000}           
})

const sharedSession = require('express-socket.io-session');

app.use(session);


io.use(sharedSession(session, {
    autoSave:true
}));

app.post('/login', function (req, res) {
    const { username } = req.body;

    
    req.session.user = username;
      
    console.log('username ' , {username: req.session.user})
    res.status(200).json({username: req.session.user});
});


io.sockets.on('connection', (socket) => {

    
    socket.on('message', (message) => {
        let socketSession = JSON.parse(socket.handshake.sessionStore.sessions[Object.keys(socket.handshake.sessionStore.sessions)])
        console.log(socketSession.user)
        io.emit('message', {username: socketSession.user, message: message})
    })

    

    socket.on('disconnect', () => {
        console.log('disconnected')    
    })
})

server.listen(4000, () => console.log(`listening on port 4000`));