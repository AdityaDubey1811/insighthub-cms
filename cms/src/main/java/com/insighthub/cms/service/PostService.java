package com.insighthub.cms.service;
import com.insighthub.cms.dto.PostRequest;
import com.insighthub.cms.dto.PostResponse;
public interface PostService {
    PostResponse createPost(PostRequest request,String authorEmail);
}
