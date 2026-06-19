import React, { useState } from 'react';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import Chat from './Chat'; // Reusing your existing Chat component

const LiveChatWidget = ({ adminEmail }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          <FiMessageCircle size={28} />
        </button>
      ) : (
        <div className="w-80 h-[450px] flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in-up">
          <div className="flex justify-between items-center p-4 bg-primary text-white shrink-0">
            <h4 className="font-bold">Live Chat (Admin)</h4>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80 transition-opacity">
              <FiX size={18} />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <Chat receiver={{ email: adminEmail, name: "Admin" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChatWidget;
