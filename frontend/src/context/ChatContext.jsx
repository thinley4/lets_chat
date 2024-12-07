import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState();
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);  
  const [messagesError, setMessagesError] = useState(null);
  
  console.log("Messages ",messages);
  

  // Get all users except the user itself and the users with whom the user has already chatted
  useEffect(() => {
    const getUser = async () => {
      // Get all users in an array format
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log(response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;

        // Donot show the user itself
        if (user?._id == u._id) {
          return false;
        }

        // array.some() returns true / false
        // userChats = all chats of the one user with other users
        if (userChats) {
          isChatCreated = userChats.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };
    getUser();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        // Get all chats of the one user with other users
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessage = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

      setIsMessagesLoading(false);

      if(response.error){
        return setMessagesError(response);
      }

      setMessages(response);
    };

    getMessage();
  },[currentChat]);

  // Update current chat

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  },[]);


  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ firstId, secondId })
    );
    
    if (response.error) {
      return console.log("error "+response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
