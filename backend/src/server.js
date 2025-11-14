import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js';

import { ENV } from './lib/env.js';
import { app, server } from './lib/socket.js';

// const app = express(); no need any more..using in socket.js
//now app is imported from lib/socket.js
const __dirname = path.resolve();

app.use(express.json({limit:"5mb"}))
app.use(cors({ origin:ENV.CLIENT_URL, credentials:true }))

app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes)

//make ready for deployment (sevalla)
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

const PORT = ENV.PORT || 3000;

//instead of app.listen..after socket imp...we do server.listen
//server is imported from socket.js
server.listen(PORT,()=>{
    console.log("Server running on port: " + PORT)
    connectDB()
})