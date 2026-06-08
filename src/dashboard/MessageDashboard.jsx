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
        // Note: This endpoint needs to be implemented in backend if it doesn't exist.
        // For now, assuming you can fetch a list of users the logged-in user has interacted with.
        // If no such endpoint exists, you might need to query the messages table by sender/receiver.
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
  // find the conversation with admin or not
  const adminConversation = conversations.filter(
    (conv) => conv === "ataurrahman24707@gmail.com",
  );
  console.log(adminConversation);

  console.log("Conversations:", conversations);
  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 p-6">
      {/* Conversations List */}
      <div className="w-1/3 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-premium overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 font-display">Messages</h2>
        {conversations.length === 0 && (
          <p className="text-slate-400">No conversations yet.</p>
        )}
        {conversations.map((conv) => (
          <button
            key={conv}
            onClick={() => setSelectedReceiver(conv)}
            className={`w-full p-4 rounded-xl text-left mb-2 transition-colors flex items-center gap-4 ${selectedReceiver === conv ? "bg-primary/10 text-primary" : "hover:bg-slate-100 dark:hover:bg-slate-700/50 "}`}
          >
            <img
              src={`${conv === "ataurrahman24707@gmail.com" ? "https://avatars.githubusercontent.com/u/145910390?v=4" : conv.photoURL || "https://ui-avatars.com/api/?name=" + conv}&background=random&size=64`}
              alt={conv.displayName || "User"}
              className="w-10 h-10 rounded-full mt-2"
            />
            <div>
              <p>{conv === "ataurrahman24707@gmail.com" ? "Admin" : conv}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-premium">
        {selectedReceiver ? (
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-bold mb-4 font-display pb-4 border-b">
              Chat with {selectedReceiver}
            </h3>
            <div className="flex-1 overflow-y-auto">
              <Chat receiverId={selectedReceiver} />
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
