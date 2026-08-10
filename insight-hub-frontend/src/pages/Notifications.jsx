import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import toast from "react-hot-toast";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const data = await getMyNotifications();
        setNotifications(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load notifications");
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Unable to update notification");
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading notifications...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Notifications
      </h1>

      <p className="mt-1 text-sm text-gray-600">
        Stay updated with activity on your content.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell size={28} className="mx-auto text-gray-400" />

            <h3 className="mt-3 font-semibold text-gray-900">
              No notifications
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              New activity will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() =>
                  !notification.read &&
                  handleMarkAsRead(notification.id)
                }
                className={`w-full p-5 text-left transition hover:bg-gray-50 ${
                  !notification.read ? "bg-blue-50/50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Bell
                    size={18}
                    className="mt-0.5 text-gray-500"
                  />

                  <div>
                    <p
                      className={`text-sm ${
                        !notification.read
                          ? "font-semibold text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {notification.message}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}