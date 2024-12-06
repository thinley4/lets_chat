import { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState(null);

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
        if(user?._id == u._id) {
          return false;
        }

        // array.some() returns true / false
        // userChats = all chats of the one user with other users
        if(userChats) {
          isChatCreated = userChats.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };
    getUser();

  },[userChats]);


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

  return (
    <ChatContext.Provider
      value={{ userChats, isUserChatsLoading, userChatsError, potentialChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};
