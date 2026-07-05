package com.insighthub.cms.service;
import com.insighthub.cms.dto.UserProfileResponse;
public interface UserService {
    void toggleFollow(Long userId,String currentUserEmail);
    UserProfileResponse getProfile(Long userId);
}
