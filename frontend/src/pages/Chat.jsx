import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { UserChat } from "../components/chat/UserChat";
import PotentialChat from "../components/chat/PotentialChat";
import { ChatBox } from "../components/chat/ChatBox";

export function Chat() {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
    useContext(ChatContext);

  if (isUserChatsLoading) {
    return <div>Loading...</div>;
  }

  if (userChatsError) {
    return <div>Error: {userChatsError.message}</div>;
  }

  if (!userChats) {
    return <div>No chats available</div>;
  }

  return (
    <div className="bg-slate-600 h-screen p-16 text-white grid grid-cols-3 gap-5">
      <div className="col-span-1">
        <PotentialChat />
        {userChats?.length < 1 ? null : (
          <div className="">
            {userChats.map((chat) => (
              <div
                onClick={() => updateCurrentChat(chat)}
                key={chat._id}
                className="mb-5"
              >
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
      <ChatBox />
    </div>
  );
}
