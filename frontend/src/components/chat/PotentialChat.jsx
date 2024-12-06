import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChat = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  console.log("Potential Chats", potentialChats);

  return (
    <div>
      {potentialChats?.length < 1 ? null : (
        <div className="flex gap-2">
          {potentialChats.map((chat) => (
            <button
              onClick={() => createChat(user._id, chat._id)}
              key={chat._id}
              className="relative p-2 bg-blue-700 rounded-lg"
            >
              <div>{chat.name}</div>
              <div className="absolute top-0 right-0">
                <div className="bg-green-500 w-3 h-3 rounded"></div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default PotentialChat;
