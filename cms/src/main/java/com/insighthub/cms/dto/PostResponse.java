package com.insighthub.cms.dto;
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String slug;
    private String status;
    private String authorName;
    private LocalDateTime createdAt;
}
