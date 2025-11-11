import connectDB from "../../../lib/mongodb";
import Message from "../../../models/Message";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await connectDB();

  const { userId } = req.query;
  const { token } = req.headers;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const messages = await Message.find({
    $or: [
      { sender: decoded.id, recipient: userId },
      { sender: userId, recipient: decoded.id },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json(messages);
}
