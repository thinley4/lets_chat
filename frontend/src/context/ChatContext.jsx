import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";
import { use } from "react";

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
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  console.log("Nofication", notification);
  

  // Initial socket connection

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    console.log("newsocket", newSocket);
    
    setSocket(newSocket);

    // useEffect(setup, dependencies?) 

    // After every re-render with changed dependencies, 
    // React will first run the cleanup function (if you provided it) 
    // with the old values, and then run your setup function with the new values. 
    // After your component is removed from the DOM, React will run your cleanup function.

    return () => {
      newSocket.disconnect();
    }
  }, [user]);

  // Add online users
  useEffect(() => {
    if(socket === null) return;
    socket.emit("addNewUser", user?._id);

    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    }

  },[socket]);

  // send Message
  
  useEffect(() => {
    if(socket === null) return;
    const recipientId = currentChat?.members.find((id) => id !== user?._id);
    socket.emit("sendMessage", {...newMessage, recipientId});
  },[newMessage]);

  // receive message and notification

  useEffect(() => {
    if(socket === null) return;

    socket.on("getMessage", (res) => {  
      if(currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some(id => id === res.senderId);

      if(isChatOpen){
        setNotification((prev) => [{...res, isRead: true}, ...prev]);
      } else {
        setNotification((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    }
  },[socket, currentChat]);

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
      setAllUsers(response);
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

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };

    getMessage();
  }, [currentChat]);

  // Post messages

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) {
        console.log("You must type something");
        return;
      }

      const response = await postRequest(
        `${baseUrl}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
        })
      );

      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  // Update current chat

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      return console.log("error " + response);
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
        sendTextMessage,
        onlineUsers,
        notification,
        allUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
