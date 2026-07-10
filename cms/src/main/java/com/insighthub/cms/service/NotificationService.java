package com.insighthub.cms.service;
import com.insighthub.cms.dto.NotificationResponse;
import com.insighthub.cms.entity.NotificationType;
import java.util.List;
public interface NotificationService {
    void sendNotification(Long userId, NotificationType type, String message);
    List<NotificationResponse> getMyNotifications(String userEmail);
    void markAsRead(Long notificationId,String userEmail);
}
