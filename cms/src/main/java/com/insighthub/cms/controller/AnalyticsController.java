package com.insighthub.cms.controller;
import com.insighthub.cms.dto.AnalyticsResponse;
import com.insighthub.cms.service.AnalyticsService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;
    public AnalyticsController(AnalyticsService analyticsService){
        this.analyticsService = analyticsService;
    }
    @GetMapping("/posts/{postId}")
    public AnalyticsResponse getPostAnalytics(@PathVariable Long postId){
        return analyticsService.getPostAnalytics(postId);
    }
    @GetMapping("/top-posts")
    public List<AnalyticsResponse> getTopPosts(){
        return analyticsService.getTopPosts();
    }
    @GetMapping("/my-posts")
    public List<AnalyticsResponse> getMyPostsAnalytics(Authentication authentication){
        return analyticsService.getAuthorPostsAnalytics(authentication.getName());
    }
}
