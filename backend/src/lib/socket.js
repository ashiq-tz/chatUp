import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
import {ENV} from './env.js'
import { socketAuthMiddleware } from '../middleware/socket.auth.middleware.js'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    },
})

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware)


//this is for storing online users
const userSocketMap = {} // later values will be...key(userId) and value(socketId)...{userId:socketId}

io.on("connection", (socket) => {

    console.log("A User connected", socket.user.fullName);

    const userId = socket.userId
    userSocketMap[userId] = socket.id

    //io.emit() is used to sent events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    //socket.on is for listen for events from clients 
    socket.on("disconnect", ()=> {
        console.log("A user disconnectdd", socket.user.fullName);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {io,app,server}
