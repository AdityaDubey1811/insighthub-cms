package com.insighthub.cms.service;
import com.insighthub.cms.dto.PostModerationRequest;
import com.insighthub.cms.dto.PostResponse;
import java.util.List;
public interface ModerationService {
    List<PostResponse> getPendingPosts();
    PostResponse moderatePost(Long postId,PostModerationRequest request);
}
