package com.insighthub.cms.controller;
import com.insighthub.cms.dto.NotificationResponse;
import com.insighthub.cms.service.ModerationService;
import com.insighthub.cms.service.NotificationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }
    @GetMapping
    public List<NotificationResponse> getMyNotifications(Authentication authentication){
        return notificationService.getMyNotifications(
                authentication.getName()
        );
    }
    @PutMapping("/{notificationId}/read")
    public void markAsRead(@PathVariable Long notificationId,Authentication authentication){
        notificationService.markAsRead(
                notificationId,
                authentication.getName()
        );
    }
}
