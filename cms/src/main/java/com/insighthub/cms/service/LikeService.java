package com.insighthub.cms.service;

public interface LikeService {
    void toggleLike(Long postId,String userEmail);
    long getLikeCount(Long postId);
}
