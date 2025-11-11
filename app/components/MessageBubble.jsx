export default function MessageBubble({ message, isMe }) {
  return (
    <div
      className={`p-2 rounded max-w-xs ${
        isMe ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
      }`}
    >
      {message.content}
    </div>
  );
}
