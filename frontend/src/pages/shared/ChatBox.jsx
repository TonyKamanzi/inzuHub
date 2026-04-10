import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function ChatBox({ house, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi 👋 I'm interested in "${house.title}"`,
      sender: "me",
    },
    {
      id: 2,
      text: "Hello! How can I help you?",
      sender: "owner",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "me" },
    ]);

    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 w-90 h-112.5 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-300 z-50">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
        <span className="font-semibold">Chat with Owner</span>

        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto bg-gray-100 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl text-sm max-w-[75%] shadow ${
                msg.sender === "me"
                  ? "bg-indigo-500 text-white rounded-br-none"
                  : "bg-white text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t border-gray-300 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-full px-2 py-2 outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
