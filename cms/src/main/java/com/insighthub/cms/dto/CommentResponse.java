package com.insighthub.cms.dto;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
@Data
public class CommentResponse {
    private Long id;
    private String content;
    private String userName;
    private LocalDateTime createdAt;
    private List<CommentResponse> replies;
}
