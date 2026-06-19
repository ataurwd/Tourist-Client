import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FormContext } from "../context/FormData";
import Chat from "../components/Chat";

const MessageDashboard = () => {
  const { user } = useContext(FormContext);
  const [conversations, setConversations] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch conversation list from backend
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/conversations/${user.email}/`,
          { withCredentials: true },
        );
        setConversations(res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };
    fetchConversations();
  }, [user?.email]);

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 p-6">
      {/* Conversations List */}
      <div className="w-1/3 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-premium overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 font-display">Messages</h2>
        {conversations.length === 0 && (
          <p className="text-slate-400">No conversations yet.</p>
        )}
        {conversations.map((conv) => {
          const isParticipantAdmin = conv.role === "admin";
          const displayName = isParticipantAdmin ? "Admin" : (conv.name || conv.email);
          const photoURL = conv.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&size=64`;

          return (
            <button
              key={conv.email}
              onClick={() => setSelectedReceiver(conv)}
              className={`w-full p-4 rounded-xl text-left mb-2 transition-colors flex items-center gap-4 ${selectedReceiver?.email === conv.email ? "bg-primary/10 text-primary" : "hover:bg-slate-100 dark:hover:bg-slate-700/50 "}`}
            >
              <img
                src={photoURL}
                alt={displayName}
                className="w-10 h-10 rounded-full mt-2 object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{displayName}</p>
                {isParticipantAdmin && (
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                    Support Staff
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-premium">
        {selectedReceiver ? (
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-bold mb-4 font-display pb-4 border-b">
              Chat with {selectedReceiver.role === "admin" ? "Admin" : (selectedReceiver.name || selectedReceiver.email)}
            </h3>
            <div className="flex-1 overflow-y-auto">
              <Chat receiver={selectedReceiver} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            Select a conversation to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDashboard;
