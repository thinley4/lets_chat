import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.jpg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationFunc } from "../../utils/unreadNotificationFunc";
import { useFetchMessage } from "../../hooks/useFetchMessage";
import moment from "moment";

export function UserChat({ chat, user }) {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers, notification, markThisUserNotificationsAsRead, updateCurrentChat } = useContext(ChatContext);
  const { latestMessage } = useFetchMessage(chat);
  const unreadNotifications = unreadNotificationFunc(notification);

  const thisChatNotifications = unreadNotifications.filter((n) => {
    return n.senderId === recipientUser?._id;
  });

  console.log("latestMessage", latestMessage);
  
  function shorternText(text) {
    if (text.length > 20) {
      return text.slice(0, 15) + "...";
    }
    return text;
  }
  

  return (
    <>
      <button onClick={() => {
        if(thisChatNotifications.length === 0) return;
        markThisUserNotificationsAsRead(thisChatNotifications, notification);
        updateCurrentChat(chat);
      }} className="w-full flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div>{recipientUser?.name}</div>
            <div>
              {latestMessage == null ? "" : shorternText(latestMessage.text)}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {onlineUsers.some((user) => user?.userId === recipientUser?._id) && (
            <div className="flex justify-end">
              <div className="bg-green-500 w-3 h-3 rounded-full"></div>
            </div>
          )}
          <div>
            {latestMessage == null ? "" : moment(latestMessage?.createdAt).format("MMM Do YY, h:mm A")}
            
          </div>
          <div className="flex justify-end">
            {thisChatNotifications.length === 0 ? null : (
              <div className="p-3 rounded-full bg-blue-600 w-4 h-4 text-white text-xs flex items-center justify-center">
                {thisChatNotifications.length}
              </div>
            )}
          </div>
        </div>
      </button>
      <div className=" pt-2 border-b-4 border-indigo-500 ..."></div>
    </>
  );
}
