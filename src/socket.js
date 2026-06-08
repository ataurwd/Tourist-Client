import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_URL || 'http://localhost:7001');

export default socket;
