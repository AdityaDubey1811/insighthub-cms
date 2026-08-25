import { Bell } from "lucide-react";
import toast from "react-hot-toast";
import { markNotificationAsRead } from "../services/notificationService";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../components/ui/EmptyState";

export default function Notifications() {
  const { notifications, setNotifications } = useAuth();


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
        <EmptyState
        title="No notifications"
        description="New activity will appear here."
        icon={Bell}
        />
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