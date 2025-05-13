import { Server } from 'socket.io';

let io;

const initSocket = (server) => {
  const socketIo = new Server(server, {
    cors: { origin: '*' }
  });

  socketIo.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => console.log(`Socket disconnected: ${socket.id}`));
  });

  io = socketIo;
};

const getIo = () => io;

export { initSocket, getIo as io };
