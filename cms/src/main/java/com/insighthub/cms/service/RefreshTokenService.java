package com.insighthub.cms.service;
import com.insighthub.cms.entity.RefreshToken;
public interface RefreshTokenService {
    RefreshToken createRefreshToken(String email);
    RefreshToken validateToken(String token);
}
