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
      rooms[roomID] = { users: [] , story: {}, arrangedFrames: []}
    
    if (rooms[roomID].users.includes(username)) 
      return callback({ success: false, message: 'Username already taken' })
    
    rooms[roomID].users.push({ username: username, role: 'Artist', story: '', img:''})
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
    rooms[roomID].story = story.title

    let index = Math.floor(Math.random() * rooms[roomID].users.length)
    rooms[roomID].users[1].role = 'Stage Setter'

    let artists = rooms[roomID].users.filter(user => user.role === 'Artist')
    let storyParts = story.story
    let storyIndex = 0
    for (let i = 0; i < artists.length; i++) {
      artists[i].story = storyParts[storyIndex]
      storyIndex = (storyIndex + 1) % storyParts.length
    }

    io.to(roomID).emit('game-started', story)
    io.to(roomID).emit('room-users', rooms[roomID])
    callback({ success: true })
  })

  socket.on('get-story', (roomID, callback) => {
    if (!rooms[roomID]) 
      return callback({ success: false, message: 'Room does not exist' })
    
    callback({ success: true, story: rooms[roomID].story })
  })

  socket.on('get-users', (roomID, callback) => {
    if (!rooms[roomID]) 
      return callback({ success: false, message: 'Room does not exist' })
    
    callback({ success: true, users: rooms[roomID].users})
  })

  socket.on('drawing', (roomID, username, imageData, callback) => {
    if (!rooms[roomID]) 
      return callback({ success: false, message: 'Room does not exist' })
    
    let index = rooms[roomID].users.findIndex(user => user.username === username)
    if (index === -1) 
      return callback({ success: false, message: 'User not found' })
    
    rooms[roomID].users[index].img = imageData
    io.to(roomID).emit('drawing', imageData)

    callback({ success: true })
  })

  socket.on('arrange-frames', (roomID, frames, callback) => {
    if (!rooms[roomID]) 
      return callback({ success: false, message: 'Room does not exist' })
    
    rooms[roomID].arrangedFrames = frames
    io.to(roomID).emit('arranged-frames', frames)

    callback({ success: true })
  })

  socket.on('get-arranged-frames', (roomID, callback) => {
    if (!rooms[roomID]) 
      return callback({ success: false, message: 'Room does not exist' })
    
    callback({ success: true, frames: rooms[roomID].arrangedFrames })
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
