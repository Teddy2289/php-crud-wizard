const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Setup express
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // URL de votre frontend
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket"]
}); // <-- Un seul '});' ici

// Stocker les connexions utilisateurs (id stagiaire → socketId)
const userSockets = new Map();

// Dans votre serveur Socket.IO
io.on('connection', (socket) => {
  console.log('Nouvelle connexion:', socket.id);
  
  socket.on('register', (userId) => {
    console.log(`Enregistrement user ${userId} avec socket ${socket.id}`);
    userSockets.set(String(userId), socket.id); // Important: conversion en string
  });

  socket.on('disconnect', () => {
    console.log('Déconnexion:', socket.id);
    // Nettoyage des utilisateurs déconnectés
    for (const [userId, sockId] of userSockets.entries()) {
      if (sockId === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
  });
});

// Route pour Laravel pour envoyer les notifications
app.post('/send-notification', (req, res) => {
  console.log('Received notification request:', req.body);
  const { userId, message, data } = req.body;
  console.log(`Sending notification to user ${userId}:`, message, data);
  console.log('Current user connections:', userSockets);
  
  const socketId = userSockets.get(String(userId)); 
  if (socketId) {
    console.log(`User ${userId} is connected with socket ID ${socketId}`);
    io.to(socketId).emit('notification', { message, data });
    return res.status(200).send('Notification sent');
  } else {
    console.log(`User ${userId} not found in connected users`);
    return res.status(404).send('User not connected');
  }
});

server.listen(3001, () => {
  console.log('Socket server running on port 3001');
});
