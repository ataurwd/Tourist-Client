import React, { useState, useEffect, useContext } from 'react';
import socket from '../socket';
import { FormContext } from '../context/FormData';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';

const Chat = ({ receiverId }) => {
  const { user } = useContext(FormContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const roomId = [user?.email, receiverId].sort().join('_');

  useEffect(() => {
    if (!user?.email || !receiverId) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/messages/${roomId}`, { withCredentials: true });
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };
    fetchHistory();

    socket.emit('join_room', roomId);

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, [roomId, user?.email, receiverId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageData = {
      roomId,
      sender: user.email,
      senderName: user.displayName || "User",
      senderPhoto: user.photoURL || "/default-profile.png",
      message: newMessage,
      receiver: receiverId,
      timestamp: new Date()
    };

    socket.emit('send_message', messageData);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.sender === user.email;
          return (
            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? 'flex-row-reverse' : ''}`}>
                <img 
                  src={msg.senderPhoto || "/default-profile.png"} 
                  alt={msg.senderName} 
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <div className={`p-3 rounded-2xl ${isMe ? 'bg-primary text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none'}`}>
                  <p className="text-sm">{msg.message}</p>
                  <span className={`text-[10px] opacity-70 ${isMe ? 'text-white' : 'text-slate-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-slate-100 dark:border-slate-700 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-full px-4 py-2 text-sm focus:outline-none"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors">
          <FiSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chat;

