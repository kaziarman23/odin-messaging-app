import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import ChatBox from "../../components/ChatBox";

export default function ChatPage() {
  const router = useRouter();
  const { userId } = router.query;

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-1/4 border-r">{/* Users list can go here */}</div>
        <div className="flex-1 p-4">
          <ChatBox recipientId={userId} />
        </div>
      </div>
    </div>
  );
}
