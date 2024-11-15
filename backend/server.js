// backend/server.js
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 8000

const rooms = []

// Handle client connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('join-room', (roomID, username, callback) => {
    if (!rooms[roomID]) 
      rooms[roomID] = { users: [] , story: {} }
    
    if (rooms[roomID].users.includes(username)) 
      return callback({ success: false, message: 'Username already taken' })
    
    rooms[roomID].users.push(username)
    socket.join(roomID)

    // Update user list for the room
    io.to(roomID).emit('room-users', rooms[roomID])

    callback({ success: true })
  });

  socket.on('load-room', (roomID, callback) => {
    if (!rooms[roomID]) 
      return callback({ success: false, message: 'Room does not exist' })
    
    callback({ success: true, users: rooms[roomID].users })
  })

  socket.on('start-game', (roomID, callback) => {
    if (!rooms[roomID]) 
      return callback({ success: false, message: 'Room does not exist' })
    
    let stories = require('./stories.json')
    let story = stories[Math.floor(Math.random() * stories.length)]
    rooms[roomID].story = story
    callback({ success: true })
  })

  socket.on('get-story', (roomID, callback) => {
    if (!rooms[roomID]) 
      return callback({ success: false, message: 'Room does not exist' })
    
    callback({ success: true, story: rooms[roomID].story })
  })

  // Handle client disconnection
  socket.on('disconnect', () => {
    for(let roomID in rooms) {
      let index = rooms[roomID].users.indexOf(socket.id)
      if (index !== -1) {
        rooms[roomID].users.splice(index, 1)
        io.to(roomID).emit('room-users', rooms[roomID])
      }
    }

    console.log(`User disconnected: ${socket.id}`)
  })
})

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
