package com.insighthub.cms.dto;
import lombok.Data;
@Data
public class AnalyticsResponse {
    private Long postId;
    private String title;
    private Long views;
    private Long likes;
}
