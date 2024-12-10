import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.jpg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

export function UserChat({ chat, user }) {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  // console.log(recipientUser);

  return (
    <>
      <button className="w-full flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <div>{recipientUser?.name}</div>
            <div>Text Message</div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {onlineUsers.some((user) => user?.userId === recipientUser?._id) && (
            <div className="flex justify-end">
              <div className="bg-green-500 w-3 h-3 rounded-full"></div>
            </div>
          )}
          <div>07/10/2024</div>
          <div className="flex justify-end">
            <div className="p-3 rounded-full bg-blue-600 w-4 h-4 text-white text-xs flex items-center justify-center">2</div>
          </div>
        </div>
      </button>
      <div className=" pt-2 border-b-4 border-indigo-500 ..."></div>
    </>
  );
}
