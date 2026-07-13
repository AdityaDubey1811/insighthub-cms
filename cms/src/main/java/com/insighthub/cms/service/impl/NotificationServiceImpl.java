package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.NotificationResponse;
import com.insighthub.cms.entity.Notification;
import com.insighthub.cms.entity.NotificationType;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.NotificationRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.service.NotificationService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import com.insighthub.cms.exception.ResourceNotFoundException;
import com.insighthub.cms.exception.ForbiddenException;
@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;
    public NotificationServiceImpl(NotificationRepository notificationRepository,
                                   UserRepository userRepository,
                                   SimpMessagingTemplate messagingTemplate){
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }
    @Override
    public void sendNotification(Long userId,NotificationType type,String message){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(type);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        Notification saved = notificationRepository.save(notification);
        NotificationResponse response = mapToResponse(saved);
        messagingTemplate.convertAndSendToUser(
                user.getEmail(),
                "/queue/notifications",
                response
        );
    }
    @Override
    public List<NotificationResponse> getMyNotifications(String userEmail){
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    public void markAsRead(Long notificationId,String userEmail){
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        if(notification.getUser().getId() !=  user.getId()){
            throw new ForbiddenException("Access denied");
        }
        notification.setRead(true);
        notificationRepository.save(notification);
    }
    private NotificationResponse mapToResponse(Notification notification){
        NotificationResponse response = new NotificationResponse();
        response.setId(notification.getId());
        response.setType(notification.getType());
        response.setMessage(notification.getMessage());
        response.setRead(notification.isRead());
        response.setCreatedAt(notification.getCreatedAt());
        return response;
    }
}
