import React, { useState, useEffect, useContext } from 'react';
import socket from '../socket';
import { FormContext } from '../context/FormData';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import useAllUser from '../hooks/useAllUser';

const Chat = ({ receiverId }) => {
  const { user } = useContext(FormContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const roomId = [user?.email, receiverId].sort().join('_');
  const [alluser] = useAllUser();

  // Find the receiver's details to get their name/photo
  const receiverData = alluser.find(u => u.email === receiverId);

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
      receiver: receiverId,
      receiverName: receiverData?.name || "Receiver",
      receiverPhoto: receiverData?.photo || "/default-profile.png",
      message: newMessage,
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
          const senderImage = isMe ? (user.photoURL || "/default-profile.png") : (msg.senderPhoto || "/default-profile.png");

          return (
            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-[85%] ${isMe ? 'flex-row-reverse' : ''}`}>
                <img 
                  src={senderImage}
                  alt={msg.senderName || "User"} 
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm" 
                />
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl shadow-sm ${isMe ? 'bg-primary text-white rounded-br-none' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-600'}`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {msg.senderName || "User"} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
