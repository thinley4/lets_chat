import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { Send } from "lucide-react";

export function ChatBox() {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipient(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {    
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  if (!recipientUser) {
    return <div>No conversation</div>;
  }

  if (isMessagesLoading) {
    return <div>Loading...</div>;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
    }
  };
  

  return (
    <div className="col-span-2 bg-gray-100 rounded-t-lg flex flex-col h-[550px]">
      <div className="flex justify-center bg-black text-white p-3 rounded-t-lg">
        {recipientUser?.name}
      </div>
      <div className=" flex flex-col">
        <div className="p-4 flex h-[450px] flex-col gap-4 overflow-y-auto">
          {messages?.map((message, index) => (
            <div
              ref={scroll}
              key={index}
              className={` ${
                message?.senderId == user?._id
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
            >
              <div className="bg-gray-800 text-white p-3 rounded-lg max-w-xs">
                <div>{message.text}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {moment(message.createdAt).format("MMM Do YY, h:mm A")}
                </div>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
          }}
          className="flex p-4 items-center bg-gray-200 rounded-b-lg"
        >
          <InputEmoji
            borderColor="rgb(156 163 175)"
            value={textMessage}
            onChange={setTextMessage}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          <button type="submit" className="bg-blue-600 p-2 rounded-full ml-2">
            <Send className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
