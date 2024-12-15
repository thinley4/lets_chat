import { useContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
import { ChatContext } from "../context/ChatContext";


export const useFetchMessage = (chat) => {
    const [latestMessage, setLatestMessage] = useState(null);
    const { newMessage, notification } = useContext(ChatContext);

    useEffect(() => {
        const getMessage = async () => {
            const response = await getRequest(`${baseUrl}/messages/${chat._id}`);
            if(response.error) {
                return console.log(response.error);
            }
            const lastMessage = response[response.length - 1];
            setLatestMessage(lastMessage);
        }
        getMessage();
    }, [ newMessage, notification ]);

    return { latestMessage };
}