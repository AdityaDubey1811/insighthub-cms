package com.insighthub.cms.service;
import com.insighthub.cms.dto.AuthResponse;
import com.insighthub.cms.dto.LoginRequest;
import com.insighthub.cms.dto.RegisterRequest;
import com.insighthub.cms.dto.RefreshTokenRequest;
public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refresh(RefreshTokenRequest request);
}
