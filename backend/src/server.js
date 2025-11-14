import express from 'express';
import fs from 'fs'
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
const projectRoot = process.cwd();
const frontendBuildPath = path.join(projectRoot, "frontend", "dist");

if (fs.existsSync(frontendBuildPath)) {
  // serve static files from frontend/dist if it exists
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });

  console.log("Serving frontend from:", frontendBuildPath);
} else {
  // helpful log so you don't get a silent Cannot GET /
  console.log("No frontend build found at:", frontendBuildPath);
  console.log("Frontend will NOT be served. Ensure the frontend is built during deploy (e.g. postinstall or build step).");
}

const PORT = ENV.PORT || 3000;

//instead of app.listen..after socket imp...we do server.listen
//server is imported from socket.js
server.listen(PORT,()=>{
    console.log("Server running on port: " + PORT)
    connectDB()
})