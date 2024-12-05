import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export function Chat() {
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);
  console.log(userChats);
  
  return (
    <div className="bg-slate-600 h-screen p-16 text-white">
      <h1>Chat</h1>
    </div>
  );
}
