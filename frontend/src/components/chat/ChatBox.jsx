import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import moment from "moment";

export function ChatBox() {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipient(currentChat, user);

    if(!recipientUser) {
        return (
            <div>No conversation</div>
        )
    }

    if(isMessagesLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="col-span-2">
            <div className="flex justify-center bg-black p-3 rounded-lg">{recipientUser?.name}</div>
            <div className="p-2 overflow-auto">
                {messages?.map((message, index) => (
                    <div key={index} className={` ${message?.senderId == user?._id ? "flex justify-start" : "flex justify-end"}`}>
                        <div className="bg-gray-800 p-2 rounded-md">
                            <div>{message.text}</div>
                            <div className="text-xs text-gray-300">
                                {moment(message.createdAt).format("MMM Do YY")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}