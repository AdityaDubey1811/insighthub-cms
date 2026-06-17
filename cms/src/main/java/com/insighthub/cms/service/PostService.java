package com.insighthub.cms.service;
import com.insighthub.cms.dto.PostRequest;
import com.insighthub.cms.dto.PostResponse;
import java.util.List;
public interface PostService {
    PostResponse createPost(PostRequest request,String authorEmail);
    List<PostResponse> getAllPosts();
    PostResponse getPostBySlug(String slug);
    PostResponse updatePost(Long postId,PostRequest request,String userEmail);
    void deletePost(Long postId,String userEmail);
}
