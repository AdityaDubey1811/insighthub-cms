package com.insighthub.cms.service;
import com.insighthub.cms.dto.AnalyticsResponse;
import java.util.List;
public interface AnalyticsService {
    AnalyticsResponse getPostAnalytics(Long postId);
    List<AnalyticsResponse> getTopPosts();
    List<AnalyticsResponse> getAuthorPostsAnalytics(String authorEmail);
}
