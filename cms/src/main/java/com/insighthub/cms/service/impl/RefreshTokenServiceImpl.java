package com.insighthub.cms.service.impl;
import com.insighthub.cms.entity.RefreshToken;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.RefreshTokenRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.service.RefreshTokenService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.UUID;
import com.insighthub.cms.exception.ResourceNotFoundException;
@Service
public class RefreshTokenServiceImpl implements RefreshTokenService{
      private final RefreshTokenRepository refreshTokenRepository;
      private final UserRepository userRepository;
      private final long REFRESH_EXPIRY_MINUTES = 60 * 24 * 7;
      public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository,
                                     UserRepository userRepository){
          this.refreshTokenRepository = refreshTokenRepository;
          this.userRepository = userRepository;
      }
      @Override
      public RefreshToken createRefreshToken(String email){
          User user = userRepository.findByEmail(email)
                  .orElseThrow(() -> new ResourceNotFoundException("User not found"));
          RefreshToken token = new RefreshToken();
          token.setUser(user);
          token.setToken(UUID.randomUUID().toString());
          token.setExpiryDate(LocalDateTime.now().plusMinutes(REFRESH_EXPIRY_MINUTES));
          token.setRevoked(false);
          return refreshTokenRepository.save(token);
      }
      @Override
    public RefreshToken validateToken(String token){
          RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                  .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
          if(refreshToken.isRevoked() || refreshToken.getExpiryDate().isBefore(LocalDateTime.now())){
              throw new RuntimeException("Refresh token expired or revoked");
          }
          return refreshToken;
      }
}
