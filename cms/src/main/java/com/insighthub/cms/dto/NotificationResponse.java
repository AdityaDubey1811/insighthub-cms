package com.insighthub.cms.dto;
import com.insighthub.cms.entity.NotificationType;
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class NotificationResponse {
    private Long id;
    private NotificationType type;
    private String message;
    private boolean read;
    private LocalDateTime createdAt;
}
