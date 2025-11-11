import connectDB from "../../../lib/mongodb";
import Message from "../../../models/Message";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();

  const { token, recipientId, content } = req.body;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const message = await Message.create({
    sender: decoded.id,
    recipient: recipientId,
    content,
  });

  res.status(201).json(message);
}
