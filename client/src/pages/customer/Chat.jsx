import React, { useState } from 'react';
import { Send, MessageSquare, Bot } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'support', text: 'Hello! Welcome to Ma’ad Support. How can we assist you with your food order today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { id: Date.now() + 1, sender: 'support', text: 'Thank you for your message. An agent will be with you shortly.' }
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
          <div className="bg-orange-600 text-white p-3 rounded-2xl shadow-md">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-black text-gray-900 text-lg">Live Support Chat</h2>
            <p className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online</span>
            </p>
          </div>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs sm:max-w-md p-4 rounded-2xl text-sm ${
                msg.sender === 'user' 
                  ? 'bg-orange-600 text-white rounded-br-xs shadow-md shadow-orange-600/10' 
                  : 'bg-white text-gray-800 rounded-bl-xs border border-gray-100 shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white flex items-center space-x-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..." 
            className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-orange-600"
          />
          <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white p-3.5 rounded-2xl shadow-lg shadow-orange-600/20 transition">
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
}