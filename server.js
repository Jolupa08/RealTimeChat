const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(express.json());
app.disable('x-powered-by')

app.post('/postMessage', (req, res) => {
 try{

  db.postMessage(req.body.message)

 }catch(err){

  console.error(err);

 }
})

app.get('/getMessages', async (req, res) => {
  try{
    const result = await db.getMessages();
    res.json(result)
 }catch(err){
  console.error(err);
 }
})

app.delete('/messages', (req, res) => {

  const authToken = process.env.AUTH_TOKEN;
  const userToken = req.header["Authorization"];

  if(userToken != authToken){
    return res.status(403).send('🚫 Acceso denegado');
  }
    
  db.truncateMessages();
  res.status(200).send("mensajes eliminados correctamente")
  
})



io.on('connection', (socket) => {
  console.log('🟢 Usuario conectado');

  socket.on('mensaje', (msg) => {
    io.emit('mensaje', msg); // enviar a todos
  });

  socket.on('disconnect', () => {
    console.log('🔴 Usuario desconectado');
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});