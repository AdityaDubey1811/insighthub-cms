package com.insighthub.cms.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class PostResponse {

    private Long id;
    private String title;
    private String content;
    private String slug;
    private String status;
    private String authorName;
    private Long authorId;
    private LocalDateTime createdAt;

    private Long categoryId;
    private String categoryName;
    private Set<Long> tagIds;
    private Set<String> tagNames;
}