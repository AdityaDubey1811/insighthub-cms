package com.insighthub.cms.service;

public interface LikeService {
    void toogleLike(Long postId,String userEmail);
    long getLikeCount(Long postId);
}
