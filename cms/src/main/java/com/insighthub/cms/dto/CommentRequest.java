package com.insighthub.cms.dto;
import lombok.Data;
@Data
public class CommentRequest {
    private String content;
    private Long parentId;
}
