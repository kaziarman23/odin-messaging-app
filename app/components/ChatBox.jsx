import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import { AuthContext } from "../context/AuthContext";

export default function ChatBox({ recipientId }) {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      const res = await axios.get(`/api/messages/${recipientId}`, {
        headers: { token },
      });
      setMessages(res.data);
    }
    fetchMessages();
  }, [recipientId, token]);

  const sendMessage = async () => {
    if (!content) return;
    await axios.post("/api/messages/send", { recipientId, content, token });
    setMessages([...messages, { content, sender: "me" }]);
    setContent("");
  };

  return (
    <div className="flex flex-col h-full border rounded">
      <div className="flex-1 overflow-auto p-2 space-y-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} isMe={msg.sender === "me"} />
        ))}
      </div>
      <div className="flex gap-2 p-2 border-t">
        <input
          className="flex-1 border rounded p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
