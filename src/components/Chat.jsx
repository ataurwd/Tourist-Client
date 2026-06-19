import React, { useState, useEffect, useContext, useRef } from 'react';
import socket from '../socket';
import { FormContext } from '../context/FormData';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';

const Chat = ({ receiver }) => {
  const { user } = useContext(FormContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const typingTimeout = useRef(null);

  const receiverId = receiver?.email;
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
      setIsTyping(false); // Stop typing indicator on message receive
    });

    socket.on('user_typing', (name) => {
      setTypingUser(name);
      setIsTyping(true);
    });

    socket.on('user_stopped_typing', () => {
      setIsTyping(false);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_typing');
      socket.off('user_stopped_typing');
    };
  }, [roomId, user?.email, receiverId]);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    socket.emit('typing', { roomId, senderName: user.displayName });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit('stop_typing', { roomId });
    }, 2000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageData = {
      roomId,
      sender: user.email,
      senderName: user.displayName || "User",
      senderPhoto: user.photoURL || "/default-profile.png",
      receiver: receiverId,
      receiverName: receiver?.name || "Receiver",
      receiverPhoto: receiver?.photo || "/default-profile.png",
      message: newMessage,
      timestamp: new Date()
    };

    socket.emit('send_message', messageData);
    socket.emit('stop_typing', { roomId });
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
        {isTyping && (
            <div className="text-xs text-slate-400 italic ml-12">
                {typingUser} is typing...
            </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-slate-100 dark:border-slate-700 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          disabled={!user}
          className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-full px-4 py-2 text-sm focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
          placeholder={user ? "Type a message..." : "Please login to chat..."}
        />
        <button
          type="submit"
          disabled={!user || !newMessage.trim()}
          className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
