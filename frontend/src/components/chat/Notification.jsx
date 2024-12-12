import { Bell } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { unreadNotificationFunc } from "../../utils/unreadNotificationFunc";
import { ChatContext } from "../../context/ChatContext";
import moment from "moment";
import { useRef } from "react";

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const { notification, allUsers, userChats, markAllNotificationsAsRead } =
    useContext(ChatContext);
  const notificationRef = useRef(null);

  const unreadNotifications = unreadNotificationFunc(notification);

  const modifiedUnreadNotifications = notification.map((n) => {
    // helper to find the name of the sender
    const sender = allUsers.find((u) => u._id === n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={notificationRef} className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none relative"
      >
        <Bell size={25} />
        {unreadNotifications.length === 0 ? null : (
          <span className="absolute -top-1 text-xs -right-1 bg-red-500 text-white rounded-full px-2">
            {unreadNotifications.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 bg-white text-black border border-gray-200 rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <div className="font-semibold">Notifications</div>
            <button
              onClick={() => markAllNotificationsAsRead(notification)}
              className="text-blue-500 hover:underline"
            >
              Mark all as read
            </button>
          </div>
          <div className="overflow-y-auto max-h-60">
            {modifiedUnreadNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              modifiedUnreadNotifications.map((n) => (
                <div
                  key={n.senderId}
                  className={`p-4 border-b ${n.isRead ? "bg-gray-100" : "bg-white"}`}
                >
                  <div className="font-medium">From: {n.senderName}</div>
                  <div className="text-sm text-gray-600">
                    sent you a message
                  </div>
                  <div className="text-xs text-gray-400">
                    {moment(n.date).calendar()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
